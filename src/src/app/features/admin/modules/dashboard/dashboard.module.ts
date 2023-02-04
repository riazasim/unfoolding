import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LineChartModule, PieChartModule } from '@swimlane/ngx-charts';
import { CardModule } from 'src/app/shared/components/cards/card.module';
import { StatisticCardV2Module } from 'src/app/shared/components/cards/statistic-card-v2/statistic-card-v2.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardRoutingModule,
    StatisticCardV2Module,
    CardModule,
    LineChartModule,
    PieChartModule,
    LayoutModule,
  ]
})
export class DashboardModule {}
