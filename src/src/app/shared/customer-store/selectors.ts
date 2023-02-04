import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeaCustomerModel } from 'src/app/models/dea-customer.model';
import { DeaCustomersEntityAdapter, DeaCustomerStoreState } from './adapter';
import { DEA_CUSTOMER_STORE_FEATURE_KEY } from './reducer';


const featureSelector = createFeatureSelector<DeaCustomerStoreState>(DEA_CUSTOMER_STORE_FEATURE_KEY);
const adapterSelectors = DeaCustomersEntityAdapter.getSelectors();


export const selectAllCustomers = createSelector(
  featureSelector,
  adapterSelectors.selectAll
);

export const selectCurrentlySelectedCustomerId = createSelector(
  featureSelector,
  state => state.selectedUserId
);

export const selectCurrentlySelectedCustomer = createSelector(
  featureSelector,
  state => {
    const selectedId = state.selectedUserId;
    if (selectedId === null || !(selectedId in state.entities)) {
      return null;
    }
    return state.entities[selectedId] as DeaCustomerModel;
  }
);
