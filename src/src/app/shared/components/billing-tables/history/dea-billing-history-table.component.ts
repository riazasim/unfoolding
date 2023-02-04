import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeaBillingHistoryEntryModel } from 'src/app/models/dea-billing-history-entry.model';
import { Nullable } from 'src/app/models/nullable.type';
import { SimpleTable } from '../../tables/simple-table';

@Component({
  selector: 'dea-billing-history-table',
  templateUrl: './dea-billing-history-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaBillingHistoryTableComponent extends SimpleTable<DeaBillingHistoryEntryModel> {

  @Input()
  public payBtnClickAction: Nullable<(historicEntry: DeaBillingHistoryEntryModel) => void> = null;

  protected initializeDisplayedColumns(): string[] {
    return ['profile', 'document', 'refId', 'date', 'amount', 'status'];
  }
}
