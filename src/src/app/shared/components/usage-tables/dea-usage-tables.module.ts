import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DeaUsageTableComponent } from './dea-usage-table.component';


@NgModule({
  declarations: [DeaUsageTableComponent],
  imports: [
    CommonModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgScrollbarModule,
  ],
  exports: [
    DeaUsageTableComponent
  ]
})
export class DeaUsageTablesModule {}
