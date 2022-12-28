import { UpdateNum } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import { DeaCustomerModel } from 'src/app/models/dea-customer.model';

export const addCustomerAction = createAction(
  '[Customer/Store] Add Customer',
  props<{ customer: DeaCustomerModel }>()
);

export const addCustomersAction = createAction(
  '[Customer/Store] Add Customers',
  props<{ customers: DeaCustomerModel[] }>()
);

export const updateCustomerAction = createAction(
  '[Customer/Store] Update Customer',
  props<{ update: UpdateNum<DeaCustomerModel> }>()
);

export const deleteCustomerAction = createAction(
  '[Customer/Store] Delete Customer',
  props<{ id: DeaCustomerModel['id'] }>()
);

export const clearCustomersAction = createAction(
  '[Customer/Store] Clear Customers',
);

export const selectCustomerAction = createAction(
  '[Customer/Store] Select Customer',
  props<{ id: DeaCustomerModel['id'] }>()
);

export const deselectCustomerAction = createAction(
  '[Customer/Store] Deselect Customer',
);
