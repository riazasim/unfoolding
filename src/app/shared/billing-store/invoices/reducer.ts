import { createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import { DeaInvoiceEntityAdapter, DeaInvoiceStoreState } from './adapter';

export const DEA_BILLING_INVOICE_STORE_FEATURE_KEY = 'billing-invoices';

const initialState: DeaInvoiceStoreState = DeaInvoiceEntityAdapter.getInitialState({
  selectedInvoiceId: null
});

export const DeaInvoiceReducer = createReducer(
  initialState,
  on(Actions.addInvoiceAction, (state, { invoice }) => {
    return DeaInvoiceEntityAdapter.addOne(invoice, state);
  }),
  on(Actions.addInvoicesAction, (state, { invoices }) => {
    return DeaInvoiceEntityAdapter.addMany(invoices, state);
  }),
  on(Actions.updateInvoiceAction, (state, { update }) => {
    return DeaInvoiceEntityAdapter.updateOne(update, state);
  }),
  on(Actions.deleteInvoiceAction, (state, { id }) => {
    return DeaInvoiceEntityAdapter.removeOne(id, state);
  }),
  on(Actions.clearInvoicesAction, state => {
    return DeaInvoiceEntityAdapter.removeAll({ ...state, selectedUserId: null });
  }),
  on(Actions.selectInvoiceAction, (state, { id }) => {
    return id in state.entities ? { ...state, selectedInvoiceId: id } : state;
  }),
  on(Actions.deselectInvoiceAction, state => {
    return { ...state, selectedInvoiceId: null };
  })
);
