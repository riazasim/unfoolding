import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeaSubUserUsage } from 'src/app/models/user.model';
import { SimpleTable } from '../tables/simple-table';

@Component({
  selector: 'dea-usage-table',
  templateUrl: 'dea-usage-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaUsageTableComponent extends SimpleTable<DeaSubUserUsage> {
  protected initializeDisplayedColumns(): string[] {
    return ['timestamp', 'email', 'source', 'balance'];
  }
}
