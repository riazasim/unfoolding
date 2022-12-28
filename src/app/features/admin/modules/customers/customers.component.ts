import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter, finalize, Observable, partition, switchMap, take, tap } from 'rxjs';
import { DeaCustomerModel } from 'src/app/models/dea-customer.model';
import { DeaEditCustomerOutputModel } from 'src/app/models/dea-edit-customer-form.model';
import { FormDataHandler } from 'src/app/models/form-handlers';
import { DeaCustomersApiService } from 'src/app/services/dea-customers-api.service';
import { LoaderOrchestratorService } from 'src/app/services/loader-orchestrator.service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm/confirm-modal.component';
import { addCustomerAction, addCustomersAction, clearCustomersAction, deleteCustomerAction, deselectCustomerAction, selectCustomerAction, updateCustomerAction } from 'src/app/shared/customer-store/actions';
import { selectAllCustomers, selectCurrentlySelectedCustomer } from 'src/app/shared/customer-store/selectors';

@Component({
  selector: 'dea-customers',
  templateUrl: './customers.component.html',
  styles: [
    `
      :host sp-access-material-panel-table {
        --app-border-radius: 40px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit, OnDestroy, FormDataHandler<DeaEditCustomerOutputModel> {

  public readonly editCustomerFormId = 'edit-customer-form';
  public readonly customers$: Observable<DeaCustomerModel[]>;
  public readonly selectedCustomer$: Observable<DeaCustomerModel | null>;

  public showOffcanvas = false;

  public readonly deleteCustomer = (id: DeaCustomerModel['id']) => {
    this.dialogService.open(ConfirmModalComponent, {
      data: {
        config: {
          cancelBtnText: 'Cancel',
          acceptBtnText: 'Remove',
          text: `Are you sure you want to remove this customer?`
        }
      }
    })
      .afterClosed()
      .pipe(
        filter((x: boolean) => x),
        tap(() => this.loaderOrchestratorService.setLoaderVisibility(true)),
        switchMap(() => this.customersApiService.deleteOne(id)),
        finalize(() => this.loaderOrchestratorService.setLoaderVisibility(false))
      )
      .subscribe({
        complete: () => this.store.dispatch(deleteCustomerAction({ id })),
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });
  };
  public readonly editCustomer = (id: DeaCustomerModel['id']) => {
    this.store.dispatch(selectCustomerAction({ id }));
    this.showOffcanvas = true;
  };

  constructor(private readonly dialogService: MatDialog,
              private readonly loaderOrchestratorService: LoaderOrchestratorService,
              private readonly customersApiService: DeaCustomersApiService,
              private readonly snackbarService: MatSnackBar,
              private readonly changeDetector: ChangeDetectorRef,
              private readonly store: Store) {
    this.customers$ = this.store.select(selectAllCustomers);
    this.selectedCustomer$ = this.store.select(selectCurrentlySelectedCustomer);
  }

  ngOnInit(): void {
    this.loaderOrchestratorService.setLoaderVisibility(true);
    this.customersApiService.requestList()
      .pipe(
        finalize(() => {
          this.loaderOrchestratorService.setLoaderVisibility(false);
        })
      )
      .subscribe({
        next: (customers: any) => this.store.dispatch(addCustomersAction({ customers })),
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearCustomersAction());
  }

  public handleFormData(formData: DeaEditCustomerOutputModel): void {
    this.loaderOrchestratorService.setLoaderVisibility(true);

    const finalizer = () => {
      this.loaderOrchestratorService.setLoaderVisibility(false);
      this.setOffCanvasVisibility(false);
    };

    const [newCustomer$, updateCustomer$] = partition(
      this.store.select(selectCurrentlySelectedCustomer)
        .pipe(
          take(1)
        ),
      (x: DeaCustomerModel | null) => x === null
    ) as unknown as [Observable<null>, Observable<DeaCustomerModel>];


    newCustomer$
      .pipe(
        switchMap(() => {
          return this.customersApiService.addOne(formData)
            .pipe(
              finalize(finalizer)
            );
        })
      )
      .subscribe({
        next: (customer: DeaCustomerModel) => this.store.dispatch(addCustomerAction({ customer })),
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });

    updateCustomer$
      .pipe(
        switchMap((x: DeaCustomerModel) => {
          return this.customersApiService.updateOne(formData, x.id)
            .pipe(
              finalize(finalizer)
            );
        })
      )
      .subscribe({
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail']),
        next: (customer: DeaCustomerModel) => {
          this.store.dispatch(updateCustomerAction({
            update: {
              id: customer.id,
              changes: customer
            }
          }));
        }
      });

  }

  public setOffCanvasVisibility(visible: boolean): void {
    this.showOffcanvas = visible;
  }

  public addCustomer(): void {
    this.store.dispatch(deselectCustomerAction());
    this.setOffCanvasVisibility(true);
  }
}
