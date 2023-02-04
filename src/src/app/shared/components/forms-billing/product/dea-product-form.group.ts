import { FormGroup } from '@angular/forms';
import { ControlProp, IFormGroup } from '@rxweb/types';
import { DeaProductModel } from 'src/app/models/dea-product.model';
import { createNumericFormControl, createRequiredControl } from 'src/app/shared/validators/generic-controls';

export function createDeaProductFormGroup(): IFormGroup<Omit<DeaProductModel, 'id'>> {
  return new FormGroup(<ControlProp<Omit<DeaProductModel, 'id'>>>{
    name: createRequiredControl<string>(),
    price: createNumericFormControl(0),
    firstPartnerFee: createNumericFormControl(0),
    secondPartnerFee: createNumericFormControl(0),
    type: createRequiredControl<string>()
  }) as IFormGroup<Omit<DeaProductModel, 'id'>>;
}
