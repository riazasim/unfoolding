import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dea-billing-payment-method-form',
  templateUrl: './dea-payment-method-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaPaymentMethodFormComponent {

  @Input()
  public id = '';

}
