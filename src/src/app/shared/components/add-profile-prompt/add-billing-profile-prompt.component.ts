import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LaresAssetsType } from 'src/app/models/lares.assets.type';
import { Nullable } from 'src/app/models/navigation-menu.model';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';


@Component({
  selector: 'admin-add-billing-profile-prompt',
  templateUrl: './add-billing-profile-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBillingProfilePromptComponent {

  public readonly heading = 'Add your business';
  public readonly textContent = `Billing profiles are used to keep track of your usage and to issue invoices. `;
  public readonly imgSrc: string;

  @Input()
  public addBillingProfileBtnClickAction: Nullable<() => void> = null;

  constructor(assetsProvider: AssetsProviderService<LaresAssetsType>) {
    this.imgSrc = assetsProvider.asset('portal', 'add-business.png');
  }

}
