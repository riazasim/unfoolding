import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeaBillingHistoryEntryModel } from 'src/app/models/dea-billing-history-entry.model';
import { GenericConfirmationModal } from '../../confirm/generic-confirmation-modal';

@Component({
  selector: 'dea-billing-payment-modal',
  templateUrl: './dea-payment-modal.component.html',
  styleUrls: ['./dea-payment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaPaymentModalComponent extends GenericConfirmationModal<DeaBillingHistoryEntryModel> {}
