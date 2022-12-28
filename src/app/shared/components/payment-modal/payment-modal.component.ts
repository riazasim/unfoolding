import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BillingHistoryEntryModel } from 'src/app/models/billing-history-entry.model';
import { GenericConfirmationModal } from 'src/app/shared/components/confirm/generic-confirmation-modal';

@Component({
  selector: 'admin-payment-modal',
  templateUrl: './payment-modal.component.html',
  styles: [
    `
      .transaction-details {
        display: grid;
        grid-auto-rows: auto;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        @apply tw-gap-y-2
      }

      .transaction-details dt, .transaction-details dd {
        @apply tw-text-muted;
      }

      .transaction-details dd {
        @apply tw-font-bold;
        text-align: right;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentModalComponent extends GenericConfirmationModal<BillingHistoryEntryModel> {}
