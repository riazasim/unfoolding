import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'admin-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodFormComponent {

  @Input()
  public id = '';

}
