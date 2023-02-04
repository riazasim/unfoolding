import { UpdateNum } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import { DeaSubUserModel } from 'src/app/models/user.model';

export const addSubUserAction = createAction(
  '[User/Store] Add User',
  props<{ user: DeaSubUserModel }>()
);

export const addSubUsersAction = createAction(
  '[User/Store] Add Users',
  props<{ users: DeaSubUserModel[] }>()
);

export const updateSubUserAction = createAction(
  '[User/Store] Update User',
  props<{ update: UpdateNum<DeaSubUserModel> }>()
);

export const deleteSubUserAction = createAction(
  '[User/Store] Delete User',
  props<{ id: DeaSubUserModel['id'] }>()
);

export const clearSubUsersAction = createAction(
  '[User/Store] Clear Users',
);

export const selectSubUserAction = createAction(
  '[User/Store] Select User',
  props<{ id: DeaSubUserModel['id'] }>()
);

export const deselectSubUserAction = createAction(
  '[User/Store] Deselect User',
);
