import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as faker from 'faker';
import { Observable, of } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card.type';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm/confirm-modal.component';
import { multipleCreditCardGenerator } from 'src/app/shared/utils/credit-card.generator';

@Component({
  templateUrl: './payment-methods.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodsComponent {

  public readonly billingHistoryRoute = `../history`;
  public readonly billingProfilesRoute = `../profiles`;

  public cards$: Observable<CreditCard[]>;
  public showOffcanvas = false;

  public readonly addPaymentMethod = () => {
    this.showOffcanvas = true;
  };

  public readonly deletePaymentMethod = (card: CreditCard) => {
    this.dialogService.open(ConfirmModalComponent, {
      data: {
        config: {
          cancelBtnText: 'Cancel',
          acceptBtnText: 'Remove',
          text: `Are you sure you want to remove this card?`
        }
      }
    });
  };


  constructor(
    private readonly dialogService: MatDialog
  ) {
    this.cards$ = of(multipleCreditCardGenerator(faker.datatype.number({ min: 0, max: 20 })));
  }
}
