import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DeaSubUserUsage } from 'src/app/models/user.model';
import { SimpleTable } from '../tables/simple-table';

@Component({
  selector: 'dea-usage-table',
  templateUrl: 'dea-usage-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaUsageTableComponent extends SimpleTable<DeaSubUserUsage> {
  constructor(private readonly dialogService: MatDialog,) {
    super();

  }
  protected initializeDisplayedColumns(): string[] {
    return ['timestamp', 'email', 'source', 'balance'];
  }
  ngOnInit(): void {
  }
}
