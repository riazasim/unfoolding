import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DeaBillingHistoryTableComponent } from './history/dea-billing-history-table.component';
import { DeaInvoicesTableComponent } from './invoices/dea-invoices-table.component';
import { DeaProductsTableComponent } from './products/dea-products-table.component';


@NgModule({
  declarations: [
    DeaBillingHistoryTableComponent,
    DeaProductsTableComponent,
    DeaInvoicesTableComponent
  ],
  imports: [
    CommonModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgScrollbarModule,
    FontAwesomeModule
  ],
  exports: [
    DeaBillingHistoryTableComponent,
    DeaProductsTableComponent,
    DeaInvoicesTableComponent
  ]
})
export class DeaBillingTablesModule { }
