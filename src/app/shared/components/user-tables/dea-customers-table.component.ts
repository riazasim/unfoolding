import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeaCustomerModel } from 'src/app/models/dea-customer.model';
import { Nullable } from 'src/app/models/nullable.type';
import { SimpleTable } from '../tables/simple-table';

@Component({
  selector: 'dea-customers-table',
  templateUrl: './dea-customers-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaCustomersTableComponent extends SimpleTable<DeaCustomerModel> {

  @Input()
  public deleteAction: Nullable<(id: DeaCustomerModel['id']) => void> = null;

  @Input()
  public editAction: Nullable<(id: DeaCustomerModel['id']) => void> = null;

  protected initializeDisplayedColumns(): string[] {
    return ['owner', 'customerName', 'taxId', 'country', 'licenseId', 'customerEmail', 'signUpDate', 'source', 'actions'];
  }

}
