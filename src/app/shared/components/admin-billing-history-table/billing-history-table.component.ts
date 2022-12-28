import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BillingHistoryEntryModel } from 'src/app/models/billing-history-entry.model';
import { Nullable } from 'src/app/models/navigation-menu.model';
import { SimpleTable } from 'src/app/shared/components/tables/simple-table';

@Component({
  selector: 'admin-billing-history-table',
  templateUrl: './billing-history-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingHistoryTableComponent extends SimpleTable<BillingHistoryEntryModel> {

  @Input()
  public payBtnClickAction: Nullable<(historicEntry: BillingHistoryEntryModel) => void> = null;

  protected initializeDisplayedColumns(): string[] {
    return ['license', 'refId', 'date', 'amount', 'balance', 'status'];
  }
}
