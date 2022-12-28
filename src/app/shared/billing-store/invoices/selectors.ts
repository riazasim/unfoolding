import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeaInvoiceModel } from 'src/app/models/dea-invoice.model';
import { DeaInvoiceEntityAdapter, DeaInvoiceStoreState } from './adapter';
import { DEA_BILLING_INVOICE_STORE_FEATURE_KEY } from './reducer';


const featureSelector = createFeatureSelector<DeaInvoiceStoreState>(DEA_BILLING_INVOICE_STORE_FEATURE_KEY);
const adapterSelectors = DeaInvoiceEntityAdapter.getSelectors();


export const selectAllInvoices = createSelector(
  featureSelector,
  adapterSelectors.selectAll
);

export const selectCurrentlySelectedInvoiceId = createSelector(
  featureSelector,
  state => state.selectedInvoiceId
);

export const selectCurrentlySelectedInvoice = createSelector(
  featureSelector,
  state => {
    const selectedId = state.selectedInvoiceId;
    if (selectedId === null || !(selectedId in state.entities)) {
      return null;
    }
    return state.entities[selectedId] as DeaInvoiceModel;
  }
);
