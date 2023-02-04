import { createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import { DeaSubUsersEntityAdapter, DeaSubUserStoreState } from './adapter';

export const DEA_SUB_USER_STORE_FEATURE_KEY = 'sub-users';

const initialState: DeaSubUserStoreState = DeaSubUsersEntityAdapter.getInitialState({
  selectedUserId: null
});

export const DeaSubUserReducer = createReducer(
  initialState,
  on(Actions.addSubUserAction, (state, { user }) => {
    return DeaSubUsersEntityAdapter.addOne(user, state);
  }),
  on(Actions.addSubUsersAction, (state, { users }) => {
    return DeaSubUsersEntityAdapter.addMany(users, state);
  }),
  on(Actions.updateSubUserAction, (state, { update }) => {
    return DeaSubUsersEntityAdapter.updateOne(update, state);
  }),
  on(Actions.deleteSubUserAction, (state, { id }) => {
    return DeaSubUsersEntityAdapter.removeOne(id, state);
  }),
  on(Actions.clearSubUsersAction, state => {
    return DeaSubUsersEntityAdapter.removeAll({ ...state, selectedUserId: null });
  }),
  on(Actions.selectSubUserAction, (state, { id }) => {
    return id in state.entities ? { ...state, selectedUserId: id } : state;
  }),
  on(Actions.deselectSubUserAction, state => {
    return { ...state, selectedUserId: null };
  })
);
