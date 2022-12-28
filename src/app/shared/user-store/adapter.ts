import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DeaSubUserModel } from 'src/app/models/user.model';

export interface DeaSubUserStoreState extends EntityState<DeaSubUserModel> {
  selectedUserId: DeaSubUserModel['id'] | null;
}

export const DeaSubUsersEntityAdapter: EntityAdapter<DeaSubUserModel> = createEntityAdapter<DeaSubUserModel>();
