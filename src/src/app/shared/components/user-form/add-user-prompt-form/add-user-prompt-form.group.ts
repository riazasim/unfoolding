import { FormGroup } from '@angular/forms';
import { ControlProp, IFormGroup } from '@rxweb/types';
import { createEmailControl, createRequiredControl } from 'src/app/shared/validators/generic-controls';
import { appendValidators } from 'src/app/shared/validators/generic-validators';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-numbers';
import { DeaAddSubUserFormModel } from './add-user-prompt-form.model';

export function createDeaAddSubUserFormGroup(): IFormGroup<DeaAddSubUserFormModel> {
  return new FormGroup(<ControlProp<DeaAddSubUserFormModel>>{
    firstName: createRequiredControl<string>(),
    middleName: createRequiredControl<string>(),
    lastName: createRequiredControl<string>(),
    email: createEmailControl(),
    phoneNumber: appendValidators(createRequiredControl<string>(), []),
    position: createRequiredControl<string>()
  }) as IFormGroup<DeaAddSubUserFormModel>;
}
