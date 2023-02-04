import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeaSubUserModel } from 'src/app/models/user.model';
import { DeaSubUsersEntityAdapter, DeaSubUserStoreState } from './adapter';
import { DEA_SUB_USER_STORE_FEATURE_KEY } from './reducer';

const featureSelector = createFeatureSelector<DeaSubUserStoreState>(DEA_SUB_USER_STORE_FEATURE_KEY);
const adapterSelectors = DeaSubUsersEntityAdapter.getSelectors();


export const selectAllSubUsers = createSelector(
  featureSelector,
  adapterSelectors.selectAll
);

export const selectCurrentlySelectedSubUserId = createSelector(
  featureSelector,
  state => state.selectedUserId
);

export const selectCurrentlySelectedSubUser = createSelector(
  featureSelector,
  state => {
    const selectedId = state.selectedUserId;
    if (selectedId === null || !(selectedId in state.entities)) {
      return null;
    }
    return state.entities[selectedId] as DeaSubUserModel;
  }
);
