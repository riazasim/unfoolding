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
  @Input() billingList: any = []
  protected initializeDisplayedColumns(): string[] {
    return ['balance', 'license', 'refId', 'date', 'amount', 'status'];
  }
  /**
   *
   */
  constructor() {
    super();
    setTimeout(() => {
      console.log("Data in list", this.billingList);
    }, 1000)

  }
}
