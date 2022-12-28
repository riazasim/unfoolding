import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { phoneNumberFormatValidationMessage } from './errors.keys';

type PhoneNumberType = 'ro' | 'bg';

const RegexMap: Readonly<Map<PhoneNumberType, RegExp>> = Object.freeze(new Map<PhoneNumberType, RegExp>([
  [
    'ro', /^(07[0-8]\d|02\d{2}|03\d{2})(\d{3}){2}$/
  ],
  [
    'bg', /^((02)|(2))?\d{9}$/
  ]
]));

const validationError: () => ValidationErrors = () => ({
  phoneNumberFormat: {
    message: phoneNumberFormatValidationMessage()
  }
});

export function phoneNumberValidator(type: PhoneNumberType): ValidatorFn {
  const regex = RegexMap.get(type);
  if (regex === undefined) {
    throw Error('Invalid phone number type');
  }
  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value;
    if (typeof val !== 'string') {
      return validationError();
    }
    const match = val.trim().match(regex);
    return match ? null : validationError();
  };
}
