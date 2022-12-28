import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { finalize, Observable, partition, switchMap, take, tap } from 'rxjs';

import { invoicesSegment, partnersSegment } from '../../billing-routing.module';
import { DeaProductModel } from 'src/app/models/dea-product.model';
import { addProductAction, addProductsAction, clearProductsAction, deleteProductAction, deselectProductAction, selectProductAction, updateProductAction } from 'src/app/shared/billing-store/products/actions';
import { selectAllProducts, selectCurrentlySelectedProduct } from 'src/app/shared/billing-store/products/selectors';
import { DeaProductsApiService } from 'src/app/services/dea-products-api.service';
import { FormDataHandler } from 'src/app/models/form-handlers';
import { handleErrorsBySnackbar } from 'src/app/services/snackbar-handlers.functions';

@Component({
  selector: 'dea-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy, FormDataHandler<Omit<DeaProductModel, 'id'>> {

  public readonly invoicesSegment = `../${invoicesSegment}`;
  public readonly partnersSegment = `../${partnersSegment}`;
  public readonly formId = 'product-form';

  public readonly products$: Observable<DeaProductModel[]>;
  public readonly selectedProduct$: Observable<DeaProductModel | null>;

  public showOffcanvas = false;

  public readonly downloadAction = (id: number) => {

  };

  public readonly deleteAction = (id: number) => {
    this.productsService.deleteOne(id)
      .subscribe({
        complete: () => this.store.dispatch(deleteProductAction({ id })),
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });
  };

  public readonly editAction = (id: number) => {
    this.store.dispatch(selectProductAction({ id }));
    this.showOffcanvas = true;
  };


  constructor(private readonly store: Store,
              private readonly snackbarService: MatSnackBar,
              private readonly productsService: DeaProductsApiService) {
    this.products$ = this.store.select(selectAllProducts);
    this.selectedProduct$ = this.store.select(selectCurrentlySelectedProduct).pipe(tap(console.log));
  }

  ngOnInit(): void {
    this.productsService.requestList()
      .subscribe({
        next: products => this.store.dispatch(addProductsAction({ products })),
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearProductsAction());
  }

  public handleFormData(formData: Omit<DeaProductModel, 'id'>): void {
    const finalizer = () => {
      this.closeOffcanvas();
    };

    const [newProduct$, updateProduct$] = partition(
      this.store.select(selectCurrentlySelectedProduct)
        .pipe(
          take(1)
        ),
      (x: DeaProductModel | null) => x === null
    ) as unknown as [Observable<null>, Observable<DeaProductModel>];


    newProduct$
      .pipe(
        switchMap(() => {
          return this.productsService.addOne(formData)
            .pipe(
              finalize(finalizer)
            );
        })
      )
      .subscribe({
        next: (product: DeaProductModel) => this.store.dispatch(addProductAction({ product })),
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail'])
      });

    updateProduct$
      .pipe(
        switchMap((x: DeaProductModel) => {
          return this.productsService.updateOne(formData, x.id)
            .pipe(
              finalize(finalizer)
            );
        })
      )
      .subscribe({
        error: (err: HttpErrorResponse) => handleErrorsBySnackbar(err, this.snackbarService, err.error['detail']),
        next: (product: DeaProductModel) => {
          this.store.dispatch(updateProductAction({
            update: {
              id: product.id,
              changes: product
            }
          }));
        }
      });

  }

  public closeOffcanvas(): void {
    this.store.dispatch(deselectProductAction());
    this.showOffcanvas = false;
  }

  public addNewProduct(): void {
    this.store.dispatch(deselectProductAction());
    this.showOffcanvas = true;
  }
}
