import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeaAssets } from 'src/app/models/assets.type';
import { Nullable } from 'src/app/models/nullable.type';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';

@Component({
  selector: 'dea-billing-payment-method-prompt',
  templateUrl: './add-payment-method-prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaAddPaymentMethodPromptComponent {

  public readonly heading = 'Add payment method';
  public readonly textContent = `There is no payment method associated with this billing profile.\n Payment method is mandatory for using this solution.`;
  public readonly imgSrc: string;

  @Input()
  public addPaymentBtnClickAction: Nullable<() => void> = null;

  constructor(assetsProvider: AssetsProviderService<DeaAssets>) {
    this.imgSrc = assetsProvider.asset('admin','add-payment-method-prompt-img.svg');
  }

}
