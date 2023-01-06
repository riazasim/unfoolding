import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as faker from 'faker';

import { Observable, of } from 'rxjs';
import { BillingHistoryEntryModel } from 'src/app/models/billing-history-entry.model';
import { PaymentModalComponent } from 'src/app/shared/components/payment-modal/payment-modal.component';


function generateMultipleHistoryEntries(count: number): BillingHistoryEntryModel[] {
  const historyEntryModels: BillingHistoryEntryModel[] = [];
  for (let i = 0; i < count; i++) {
    historyEntryModels.push(generateEntry());
  }
  return historyEntryModels;
}

function generateEntry(): BillingHistoryEntryModel {

  return {
    balance: faker.random.arrayElement(['Company A', 'Company B']),
    licenceSerialNumber: faker.random.arrayElement(['invoice', 'payment']),
    amount: faker.datatype.number({min: -5000, max: 5000}),
    date: faker.date.between(new Date(0), new Date()).getTime(),
    refId: faker.datatype.uuid().substr(0, 8),
    status: faker.datatype.boolean() ? 'paid' : 'unpaid'
  };
}

@Component({
  templateUrl: './billing-history.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingHistoryComponent {

  public readonly billingProfilesRoute = `../profiles`;
  public readonly paymentMethodsRoute = `../payment-methods`;

  public paymentHistoryEntries$: Observable<BillingHistoryEntryModel[]>;

  public readonly payInvoice: (historicEntry: BillingHistoryEntryModel) => void = (historicEntry: BillingHistoryEntryModel) => {
    this.dialogService.open(PaymentModalComponent, {
      panelClass: 'no-padding-mat-dialog',
      data: {
        config: historicEntry
      }
    });
  };

  constructor(private readonly dialogService: MatDialog) {
    this.paymentHistoryEntries$ = of(generateMultipleHistoryEntries(faker.datatype.number({min: 0, max: 20})));
  }

}
