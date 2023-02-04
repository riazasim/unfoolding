import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeaInvoiceModel } from 'src/app/models/dea-invoice.model';
import { SimpleTable } from '../../tables/simple-table';

@Component({
  selector: 'dea-billing-invoices-table',
  templateUrl: './dea-invoices-table.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaInvoicesTableComponent extends SimpleTable<DeaInvoiceModel> {
  protected initializeDisplayedColumns(): string[] {
    return ['owner', 'customer', 'refId', 'date', 'priceList', 'total', 'partnerAmount', 'ownerAmount', 'status'];
  }

}
