import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DeaCustomerModel } from 'src/app/models/dea-customer.model';

export interface DeaCustomerStoreState extends EntityState<DeaCustomerModel> {
  selectedUserId: DeaCustomerModel['id'] | null;
}

export const DeaCustomersEntityAdapter: EntityAdapter<DeaCustomerModel> = createEntityAdapter<DeaCustomerModel>();
