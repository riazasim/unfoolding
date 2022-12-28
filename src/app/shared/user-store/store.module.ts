import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DEA_SUB_USER_STORE_FEATURE_KEY, DeaSubUserReducer } from './reducer';


@NgModule({
  imports: [
    StoreModule.forFeature(
      DEA_SUB_USER_STORE_FEATURE_KEY,
      DeaSubUserReducer
    )
  ]
})
export class DeaSubUsersStoreModule {}
