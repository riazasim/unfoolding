import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmModalConfig } from './confirm-modal.config';
import { GenericConfirmationModal } from './generic-confirmation-modal';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent extends GenericConfirmationModal<ConfirmModalConfig> {}
