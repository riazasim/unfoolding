import { createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import { DeaCustomersEntityAdapter, DeaCustomerStoreState } from './adapter';

export const DEA_CUSTOMER_STORE_FEATURE_KEY = 'customers';

const initialState: DeaCustomerStoreState = DeaCustomersEntityAdapter.getInitialState({
  selectedUserId: null
});

export const DeaCustomerReducer = createReducer(
  initialState,
  on(Actions.addCustomerAction, (state, { customer }) => {
    return DeaCustomersEntityAdapter.addOne(customer, state);
  }),
  on(Actions.addCustomersAction, (state, { customers }) => {
    return DeaCustomersEntityAdapter.addMany(customers, state);
  }),
  on(Actions.updateCustomerAction, (state, { update }) => {
    return DeaCustomersEntityAdapter.updateOne(update, state);
  }),
  on(Actions.deleteCustomerAction, (state, { id }) => {
    return DeaCustomersEntityAdapter.removeOne(id, state);
  }),
  on(Actions.clearCustomersAction, state => {
    return DeaCustomersEntityAdapter.removeAll({ ...state, selectedUserId: null });
  }),
  on(Actions.selectCustomerAction, (state, { id }) => {
    return id in state.entities ? { ...state, selectedUserId: id } : state;
  }),
  on(Actions.deselectCustomerAction, state => {
    return { ...state, selectedUserId: null };
  })
);
