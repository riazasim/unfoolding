import { UpdateNum } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import { DeaInvoiceModel } from 'src/app/models/dea-invoice.model';

export const addInvoiceAction = createAction(
  '[Invoice/Store] Add Invoice',
  props<{ invoice: DeaInvoiceModel }>()
);

export const addInvoicesAction = createAction(
  '[Invoice/Store] Add Invoices',
  props<{ invoices: DeaInvoiceModel[] }>()
);

export const updateInvoiceAction = createAction(
  '[Invoice/Store] Update Invoice',
  props<{ update: UpdateNum<DeaInvoiceModel> }>()
);

export const deleteInvoiceAction = createAction(
  '[Invoice/Store] Delete Invoice',
  props<{ id: DeaInvoiceModel['id'] }>()
);

export const clearInvoicesAction = createAction(
  '[Invoice/Store] Clear Invoices',
);

export const selectInvoiceAction = createAction(
  '[Invoice/Store] Select Invoice',
  props<{ id: DeaInvoiceModel['id'] }>()
);

export const deselectInvoiceAction = createAction(
  '[Invoice/Store] Deselect Invoice',
);
