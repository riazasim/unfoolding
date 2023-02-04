import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DEA_BILLING_INVOICE_STORE_FEATURE_KEY, DeaInvoiceReducer } from './invoices/reducer';
import { DEA_BILLING_PRODUCT_STORE_FEATURE_KEY, DeaProductReducer } from './products/reducer';


@NgModule({
  imports: [
    StoreModule.forFeature(
      DEA_BILLING_PRODUCT_STORE_FEATURE_KEY,
      DeaProductReducer
    ),
    StoreModule.forFeature(
      DEA_BILLING_INVOICE_STORE_FEATURE_KEY,
      DeaInvoiceReducer
    )
  ]
})
export class DeaBillingStoreModule {}
