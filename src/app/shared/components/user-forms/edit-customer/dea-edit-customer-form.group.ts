import { FormGroup } from '@angular/forms';
import { ControlProp, IFormGroup } from '@rxweb/types';
import { createDateFormControl, createEmailControl, createLetterOnlyFormControl, createRequiredControl } from 'src/app/shared/validators/generic-controls';
import { DeaEditCustomerFormModel } from './dea-edit-customer-form.model';


function group(): ControlProp<DeaEditCustomerFormModel> {
  return {
    fullName: createLetterOnlyFormControl(),
    email: createEmailControl(),
    country: createRequiredControl<string>(),
    taxId: createRequiredControl<number>(),
    signUpDate: createDateFormControl(),
    source: createRequiredControl<string>(),
    owner: createRequiredControl<string>(),
    contactNumber: createRequiredControl<string>()
  } as unknown as ControlProp<DeaEditCustomerFormModel>;
}

export function createDeaEditCustomerFormGroup(): IFormGroup<DeaEditCustomerFormModel> {
  return new FormGroup(group()) as IFormGroup<DeaEditCustomerFormModel>;
}
