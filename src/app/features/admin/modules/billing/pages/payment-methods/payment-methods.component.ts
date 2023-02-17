import { ChangeDetectionStrategy, Component, OnInit,OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as faker from 'faker';
import { Observable, of, Subscription } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card.type';
import { DeabillingApiService } from 'src/app/services/dealing-billing-service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm/confirm-modal.component';
import { multipleCreditCardGenerator } from 'src/app/shared/utils/credit-card.generator';

@Component({
  templateUrl: './payment-methods.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodsComponent implements OnInit,OnDestroy {

  public readonly billingHistoryRoute = `../history`;
  public readonly billingProfilesRoute = `../profiles`;
  public readonly billingOverviewRoute = `../overview`;
  public readonly managesubscription = `../subscription`;

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


  private subscription: Subscription[] = [];
  constructor(
    private readonly dialogService: MatDialog,
    private readonly dealingService:DeabillingApiService
  ) {
    this.cards$ = of(multipleCreditCardGenerator(faker.datatype.number({ min: 0, max: 20 })));
  }
  private userId: number;
  ngOnInit(): void {
    this.userId = Number(JSON.parse(sessionStorage.getItem('user')).id);
    this.getBillingMethods();
  }
  public billingMethodsList: any = [];
  public getBillingMethods() {
    this.subscription.push(
      this.dealingService.requestListOfBillingMethods(this.userId).subscribe(
        (Response) => {
          if (Response) {
            this.billingMethodsList = Response.data.items;
          console.log("Response of billing servcie", this.billingMethodsList);
          }
        },
        (Error) => {
          console.log("Error of billing servcie", Error);
        }
      )
    )
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }
}
