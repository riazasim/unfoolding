import { FormGroup } from '@angular/forms';
import { ControlProp, IFormGroup } from '@rxweb/types';
import { DeaInvoiceModel } from 'src/app/models/dea-invoice.model';

export function createDeaInvoiceFormGroup():IFormGroup<Omit<DeaInvoiceModel,'id'>> {
  return new FormGroup(<ControlProp<Omit<DeaInvoiceModel,'id'>>>{

  }) as IFormGroup<Omit<DeaInvoiceModel,'id'>>;
}
