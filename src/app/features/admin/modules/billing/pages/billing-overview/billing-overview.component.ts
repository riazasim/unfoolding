import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-billing-overview',
  templateUrl: './billing-overview.component.html',
  styleUrls: ['./billing-overview.component.scss']
})
export class BillingOverviewComponent implements OnInit {
  public legend = true;
  public legendPosition: LegendPosition = LegendPosition.Right;
  public pieChardData: { name: string, value: number }[] = [];
  public showOffcanvas = false;
  public readonly paymentMethodsRoute = `../payment-methods`;
  public readonly billingHistoryRoute = `../history`;
  public readonly managesubscription = `../subscription`;

  constructor( private readonly bpo: BreakpointObserver,) {
    bpo.observe('(min-width:768px)')
    .subscribe({
      next: (bpState) => this.legend = bpState.matches
    });
   }

  ngOnInit(): void {
  }

}
