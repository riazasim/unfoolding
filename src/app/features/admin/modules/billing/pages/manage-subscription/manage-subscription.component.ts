import { Component, OnInit } from '@angular/core';
import { DeaAssets } from 'src/app/models/assets.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';

@Component({
  selector: 'app-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.scss']
})
export class ManageSubscriptionComponent implements OnInit {
  subscpImgSrc1: string;
  public readonly paymentMethodsRoute = `../payment-methods`;
  public readonly billingOverviewRoute = `../overview`;
  public readonly billingHistoryRoute = `../history`;
  constructor( assetsProvider: AssetsProviderService<DeaAssets>,) { 
    this.subscpImgSrc1 = assetsProvider.asset('portal', 'Managesubscription.png');
  }

  ngOnInit(): void {
  }

}
