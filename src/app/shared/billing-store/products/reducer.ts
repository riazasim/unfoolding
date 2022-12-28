import { createReducer, on } from '@ngrx/store';
import * as Actions from './actions';
import { DeaProductsEntityAdapter, DeaProductStoreState } from './adapter';

export const DEA_BILLING_PRODUCT_STORE_FEATURE_KEY = 'billing-products';

const initialState: DeaProductStoreState = DeaProductsEntityAdapter.getInitialState({
  selectedProductId: null
});

export const DeaProductReducer = createReducer(
  initialState,
  on(Actions.addProductAction, (state, { product }) => {
    return DeaProductsEntityAdapter.addOne(product, state);
  }),
  on(Actions.addProductsAction, (state, { products }) => {
    return DeaProductsEntityAdapter.addMany(products, state);
  }),
  on(Actions.updateProductAction, (state, { update }) => {
    return DeaProductsEntityAdapter.updateOne(update, state);
  }),
  on(Actions.deleteProductAction, (state, { id }) => {
    return DeaProductsEntityAdapter.removeOne(id, state);
  }),
  on(Actions.clearProductsAction, state => {
    return DeaProductsEntityAdapter.removeAll({ ...state, selectedUserId: null });
  }),
  on(Actions.selectProductAction, (state, { id }) => {
    return id in state.entities ? { ...state, selectedProductId: id } : state;
  }),
  on(Actions.deselectProductAction, state => {
    return { ...state, selectedProductId: null };
  })
);
