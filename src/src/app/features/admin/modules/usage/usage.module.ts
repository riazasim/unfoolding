import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpAccessMaterialPanelTableModule } from 'src/app/shared/components/material-panel-table/material-panel-table.component';
import { DeaUsageTablesModule } from 'src/app/shared/components/usage-tables/dea-usage-tables.module';
import { UsageRoutingModule } from './usage-routing.module';
import { DeaUsageComponent } from './usage.component';

@NgModule({
  declarations: [
    DeaUsageComponent
  ],
  imports: [
    CommonModule,
    UsageRoutingModule,
    DeaUsageTablesModule,
    SpAccessMaterialPanelTableModule,
  ]
})
export class UsageModule { }
