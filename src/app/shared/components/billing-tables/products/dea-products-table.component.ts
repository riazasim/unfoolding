import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeaProductModel } from 'src/app/models/dea-product.model';
import { Nullable } from 'src/app/models/nullable.type';
import { SimpleTable } from '../../tables/simple-table';

@Component({
  selector: 'dea-billing-products-table',
  templateUrl: './dea-products-table.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaProductsTableComponent extends SimpleTable<DeaProductModel> {

  @Input()
  public downloadAction: Nullable<(id: DeaProductModel['id']) => void> = null;

  @Input()
  public editAction: Nullable<(id: DeaProductModel['id']) => void> = null;

  @Input()
  public deleteAction: Nullable<(id: DeaProductModel['id']) => void> = null;

  protected initializeDisplayedColumns(): string[] {
    return ['type', 'name', 'price', 'firstPartnerFee', 'secondPartnerFee', 'actions'];
  }

}
