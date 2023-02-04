import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DeaInvoiceModel } from 'src/app/models/dea-invoice.model';


export interface DeaInvoiceStoreState extends EntityState<DeaInvoiceModel> {
  selectedInvoiceId: DeaInvoiceModel['id'] | null;
}

export const DeaInvoiceEntityAdapter: EntityAdapter<DeaInvoiceModel> = createEntityAdapter<DeaInvoiceModel>();
