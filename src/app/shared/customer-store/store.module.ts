import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DEA_CUSTOMER_STORE_FEATURE_KEY, DeaCustomerReducer } from './reducer';


@NgModule({
  imports: [
    StoreModule.forFeature(
      DEA_CUSTOMER_STORE_FEATURE_KEY,
      DeaCustomerReducer
    )
  ]
})
export class DeaCustomersStoreModule {}
