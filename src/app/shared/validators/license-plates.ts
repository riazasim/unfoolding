import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BulgarianCounties } from 'src/app/core/models/counties/bg';
import { RomanianCounties } from 'src/app/core/models/counties/ro';
import { licensePlateFormatValidationMessage } from './errors.keys';


type LicensePlatesFormat = 'ro' | 'bg';

const romanianCountyCodePrefixes = RomanianCounties.join('|') as string;
const bulgarianCountryCodePrefixes = BulgarianCounties.join('|') as string;


const RegexValidationMap: Readonly<Map<LicensePlatesFormat, RegExp>> =
  Object.freeze(new Map<LicensePlatesFormat, RegExp>(
    [
      ['ro', new RegExp(`^((${romanianCountyCodePrefixes})[0-9]{2}|B[0-9]{3})[a-zA-Z]{3}$`)],
      ['bg', new RegExp(`^(${bulgarianCountryCodePrefixes})[0-9]{4}[a-zA-Z]{2}$`)]
    ]
  ));

const validationError: () => ValidationErrors = () => ({
  licensePlateFormat: {
    message: licensePlateFormatValidationMessage()
  }
});

/**
 * Function that creates a license plate validator based on the passed format.
 * If an invalid format is passed, the function throws.
 * This will NOT validate special types, like military or diplomatic license plates
 * @param format
 */
export function licensePlatesValidatorForCountry(format: LicensePlatesFormat): ValidatorFn {
  const regex = RegexValidationMap.get(format);
  if (regex === undefined) {
    throw Error('Invalid license plate format');
  }
  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value;
    if (typeof val !== 'string') {
      return validationError();
    }
    const match = val.trim().toUpperCase().match(regex);
    return match ? null : validationError();
  };
}

export function licensePlatesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validators = RegexValidationMap.values();
    const controlValue = control.value;

    if (typeof controlValue === 'string' && controlValue.length > 0) {
      for (const validator of validators) {
        const match = controlValue.toUpperCase().match(validator);
        if (match) {
          return null;
        }
      }
    } else if ((typeof controlValue === 'string' && controlValue.length === 0) || controlValue == null) {
      return null;
    }

    return validationError();
  };
}
