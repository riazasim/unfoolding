import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IFormGroup } from '@rxweb/types';
import { AbstractForm } from 'src/app/directives/abstract-form';
import { DeaInvoiceModel } from 'src/app/models/dea-invoice.model';
import { createDeaInvoiceFormGroup } from './dea-invoice-form.group';

export type DeaInvoiceFormModel = Omit<DeaInvoiceModel, 'id' | 'status' | 'refId'>;

@Component({
  selector: 'dea-billing-invoice-form',
  templateUrl: './dea-invoice-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaInvoiceFormComponent extends AbstractForm<DeaInvoiceModel, DeaInvoiceFormModel, DeaInvoiceFormModel> {
  protected buildFormGroup(): IFormGroup<Omit<DeaInvoiceModel, 'id'>> {
    return createDeaInvoiceFormGroup();
  }

  protected convertFormToOutputValue(data: DeaInvoiceFormModel): DeaInvoiceFormModel {
    return data;
  }

  protected convertSeedToFormValue(seed: DeaInvoiceModel): DeaInvoiceFormModel {
    return seed;
  }
}
