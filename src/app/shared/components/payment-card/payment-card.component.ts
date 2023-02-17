import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CreditCard } from 'src/app/models/credit-card.type';
import { Nullable } from 'src/app/models/navigation-menu.model';

@Component({
  selector: 'payment-card',
  templateUrl: './payment-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentCardComponent {
  @Input() dataList: any = [];
  @Input()
  public creditCard: Nullable<CreditCard> = null;

  @Input()
  public withDelete = true;

  @Input()
  public deleteAction: Nullable<(card: CreditCard) => void> = null;
  /**
   *
   */
  constructor() {
    setTimeout(() => {
      console.log("datalist in payment card componet", this.creditCard)
    }, 1000);
  }
}
