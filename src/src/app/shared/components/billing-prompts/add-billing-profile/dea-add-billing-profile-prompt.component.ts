import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeaAssets } from 'src/app/models/assets.type';
import { Nullable } from 'src/app/models/nullable.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';

@Component({
  selector: 'dea-billing-profile-prompt',
  templateUrl: './dea-add-billing-profile-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaAddBillingProfilePromptComponent {

  public readonly heading = 'Add your business';
  public readonly textContent = `Billing profiles are used to keep track of your usage and to issue invoices.`;
  public readonly imgSrc: string;

  @Input()
  public addBillingProfileBtnClickAction: Nullable<() => void> = null;

  constructor(assetsProvider: AssetsProviderService<DeaAssets>) {
    this.imgSrc = assetsProvider.asset('portal', 'add-billing-profile-prompt-img.svg');
  }

}
