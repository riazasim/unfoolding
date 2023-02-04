import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { DeaProductModel } from 'src/app/models/dea-product.model';

export interface DeaProductStoreState extends EntityState<DeaProductModel> {
  selectedProductId: DeaProductModel['id'] | null;
}

export const DeaProductsEntityAdapter: EntityAdapter<DeaProductModel> = createEntityAdapter<DeaProductModel>();
