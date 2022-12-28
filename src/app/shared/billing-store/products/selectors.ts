import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeaProductModel } from 'src/app/models/dea-product.model';
import { DeaProductsEntityAdapter, DeaProductStoreState } from './adapter';
import { DEA_BILLING_PRODUCT_STORE_FEATURE_KEY } from './reducer';


const featureSelector = createFeatureSelector<DeaProductStoreState>(DEA_BILLING_PRODUCT_STORE_FEATURE_KEY);
const adapterSelectors = DeaProductsEntityAdapter.getSelectors();


export const selectAllProducts = createSelector(
  featureSelector,
  adapterSelectors.selectAll
);

export const selectCurrentlySelectedProductId = createSelector(
  featureSelector,
  state => state.selectedProductId
);

export const selectCurrentlySelectedProduct = createSelector(
  featureSelector,
  state => {
    const selectedId = state.selectedProductId;
    if (selectedId === null || !(selectedId in state.entities)) {
      return null;
    }
    return state.entities[selectedId] as DeaProductModel;
  }
);
