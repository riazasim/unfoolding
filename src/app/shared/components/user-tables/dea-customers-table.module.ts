import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DeaCustomersTableComponent } from './dea-customers-table.component';


@NgModule({
  declarations: [
    DeaCustomersTableComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgScrollbarModule,
    FontAwesomeModule
  ],
  exports: [
    DeaCustomersTableComponent
  ]
})
export class DeaCustomersTableModule { }
