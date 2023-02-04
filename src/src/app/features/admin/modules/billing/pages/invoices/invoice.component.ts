import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeaInvoiceModel } from 'src/app/models/dea-invoice.model';
// import { DeaInvoicesApiService } from 'src/app/services/dea-invoices-api.service';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';
import { addInvoicesAction, deselectInvoiceAction } from 'src/app/shared/billing-store/invoices/actions';
import { selectAllInvoices } from 'src/app/shared/billing-store/invoices/selectors';
import { partnersSegment, productsSegment } from '../../billing-routing.module';

@Component({
  selector: 'dea-invoice',
  templateUrl: './invoice.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent implements OnInit {

  public readonly productsSegment = `../${productsSegment}`;
  public readonly partnersSegment = `../${partnersSegment}`;
  public readonly formId = 'invoices-form';

  public readonly invoices$: Observable<DeaInvoiceModel[]>;
  public showOffcanvas = false;

  constructor(private readonly store: Store,
              private readonly snackbarService: MatSnackBar,
              // private readonly invoicesService: DeaInvoicesApiService
              ) {
    this.invoices$ = this.store.select(selectAllInvoices);
  }

  ngOnInit(): void {
    // this.invoicesService.requestList()
    //   .subscribe({
    //     next: (invoices: any) => this.store.dispatch(addInvoicesAction({ invoices })),
    //     error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
    //   });
  }

  public addNewInvoice(): void {
    this.showOffcanvas = true;
  }

  public closeOffcanvas(): void {
    this.showOffcanvas = false;
    this.store.dispatch(deselectInvoiceAction());
  }
}
