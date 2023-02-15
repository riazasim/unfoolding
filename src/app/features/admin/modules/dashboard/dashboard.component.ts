import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { finalize } from 'rxjs';
import { DeaDashboardService } from 'src/app/services/dea-dashboard.service';
import { LoaderOrchestratorService } from 'src/app/services/loader-orchestrator.service';

@Component({
  selector: 'dea-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      @media (min-width: 992px) {
        .user-dist-by-source {
          max-width: calc(66.667% - 2rem);
        }

        .top-5-users {
          max-width: 33.333%;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  public readonly showLabels = true;
  public readonly animations = true;
  public readonly xAxis = true;
  public readonly yAxis = true;
  public readonly showYAxisLabel = true;
  public readonly showXAxisLabel = true;
  public readonly xAxisLabel = 'Month';
  public readonly yAxisLabel = 'Label';
  public readonly timeline = true;
  public readonly colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  public legend = true;
  public legendPosition: LegendPosition = LegendPosition.Right;

  public lineChartData: { name: string, series: { name: string, value: number }[] }[] = [];
  public pieChardData: { name: string, value: number }[] = [];

  public count = 0;
  public usage = 0;
  public nextBillingDate = '02-Feb';

  private static createNameFromDateString(date: string): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  }


  constructor(private readonly bpo: BreakpointObserver,
    private readonly loaderOrchestrator: LoaderOrchestratorService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dashboardApiService: DeaDashboardService
  ) {
    bpo.observe('(min-width:768px)')
      .subscribe({
        next: (bpState) => this.legend = bpState.matches
      });
  }

  ngOnInit(): void {
    this.loaderOrchestrator.setLoaderVisibility(true);

    this.dashboardApiService
      .getUserDashboardData(Number(JSON.parse(sessionStorage.getItem('user')).id))
      .pipe(
        finalize(() => this.loaderOrchestrator.setLoaderVisibility(false))
      )
      .subscribe({
        next: (data1: any) => {
          debugger
          const data = data1.data.attributes[0];
          this.count = Number(data.subUserCount);
          this.usage = data.availableUsage;
          this.nextBillingDate = data.nextBillingDate;
          this.lineChartData = [
            {
              name: 'Daily usage',
              series: data.dailyUsage.map(x => ({
                name: DashboardComponent.createNameFromDateString(x.dateTime),
                value: x.balance
              }))
            }
          ];
          this.pieChardData = data.usageDistributionBySource.map(x => ({
            name: '',
            value: x.balance
          }));
        },
        complete: () => {
          this.changeDetector.detectChanges();
        }
      });
  }
}
