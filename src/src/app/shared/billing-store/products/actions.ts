import { UpdateNum } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import { DeaProductModel } from 'src/app/models/dea-product.model';


export const addProductAction = createAction(
  '[Product/Store] Add Product',
  props<{ product: DeaProductModel }>()
);

export const addProductsAction = createAction(
  '[Product/Store] Add Products',
  props<{ products: DeaProductModel[] }>()
);

export const updateProductAction = createAction(
  '[Product/Store] Update Product',
  props<{ update: UpdateNum<DeaProductModel> }>()
);

export const deleteProductAction = createAction(
  '[Product/Store] Delete Product',
  props<{ id: DeaProductModel['id'] }>()
);

export const clearProductsAction = createAction(
  '[Product/Store] Clear Products',
);

export const selectProductAction = createAction(
  '[Product/Store] Select Product',
  props<{ id: DeaProductModel['id'] }>()
);

export const deselectProductAction = createAction(
  '[Product/Store] Deselect Product',
);
