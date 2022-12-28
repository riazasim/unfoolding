import { PasswordValidation } from '@rxweb/reactive-form-validators/models';
import { errorsScope } from './form-scopes.functions';
import { intervalKeys } from './utils.functions';

/**
 * The validation message key for the file count
 * @param minFiles - defaults to undefined
 * @param maxFiles - defaults to undefined
 *
 * If both values are undefined, then undefined is returned
 * If only minSize is undefined, the fileCountLess key is returned
 * If only maxSize is undefined, the fileCountGreater key is undefined
 * If both are defined and EQUAL the fileCountExactly key is returned
 * If both are defined and EQUAL the fileCountBetween key is returned
 *
 */
export function fileCountValidationMessage(minFiles: number | undefined, maxFiles: number | undefined): string | undefined {
  return intervalKeys(minFiles, maxFiles, errorsScope('fileCount'));
}

/**
 * The validation message key for the file size
 * @param minSize - defaults to undefined
 * @param maxSize - defaults to undefined
 */
export function fileSizeValidationMessage(minSize: number | undefined, maxSize: number | undefined): string | undefined {
  return intervalKeys(minSize, maxSize, errorsScope('fileSize'));
}


/**
 * The validation message key for the file count
 * @param minLength - defaults to undefined
 * @param maxLength - defaults to undefined
 *
 * If both values are undefined, then undefined is returned
 * If only minSize is undefined, the choiceCountLess key is returned
 * If only maxSize is undefined, the choiceCountGreater key is undefined
 * If both are defined and EQUAL the choiceCountExactly key is returned
 * If both are defined and EQUAL the choiceCountBetween key is returned
 *
 */
export function choiceCountValidationMessage(minLength: number | undefined, maxLength: number | undefined): string | undefined {
  return intervalKeys(minLength, maxLength, errorsScope('choice'));
}

/**
 * The validation message keys for numbers and number intervals
 * @param min - defaults to undefined
 * @param max - defaults to undefined
 */
export function numberIntervalsValidationMessage(min: number | undefined, max: number | undefined): string | undefined {
  return intervalKeys(min, max, errorsScope('number'));
}

/**
 * The validation message keys for lengths
 * @param min - defaults to undefined
 * @param max - defaults to undefined
 */
export function fieldLengthValidationMessage(min?: number | undefined, max?: number | undefined): string | undefined {
  return intervalKeys(min, max, errorsScope('length'));
}

/**
 * The validation message key for the image files
 */
export function imageValidationMessage(): string {
  return errorsScope('image');
}

/**
 * The validation message key for the value matching
 */
export function matchValuesValidationMessage(): string {
  return errorsScope('matchValue');
}

/**
 * The validation message key for alpha numeric validation
 */
export function alphaNumericValidationMessage(): string {
  return errorsScope('alphaNumeric');
}

/**
 * The validation message key for date validation
 */
export function dateValidationMessage(): string {
  return errorsScope('date');
}

/**
 * The validation message key for the license plate formats
 */
export function licensePlateFormatValidationMessage(): string {
  return errorsScope('licensePlateFormat');
}

/**
 * The validation message key for the only letter validator
 */
export function onlyLettersValidationMessage(): string {
  return errorsScope('onlyLetters');
}

/**
 * The validation message key for the only numbers validator
 */
export function onlyNumbersValidationMessage(): string {
  return errorsScope('onlyNumbers');
}

/**
 * The validation message key for the only uppercase validator
 */
export function onlyUppercaseValidationMessage(): string {
  return errorsScope('onlyUppercase');
}

/**
 * The validation message key for the only lowercase validator
 */
export function onlyLowercaseValidationMessage(): string {
  return errorsScope('onlyLowercase');
}

/**
 * The validation message key for the only phone number format validator
 */
export function phoneNumberFormatValidationMessage(): string {
  return errorsScope('phoneNumberFormat');
}

/**
 * The validation message key for required validator
 */
export function requiredValidationMessage(): string {
  return errorsScope('required');
}

/**
 * The validation message key for the starts with letter validator
 */
export function startsWithLetterValidationMessage(): string {
  return errorsScope('startsWithLetter');
}

export function identicalFieldValidationMessage(): string {
  return errorsScope('identical');
}

export function emailValidationMessage(): string {
  return errorsScope('email');
}

export function lessThanEqualValidationMessage(): string {
  return errorsScope('lessThanEqualToField');
}

export function passwordValidationMessages(): Record<keyof Pick<PasswordValidation, 'maxLength' | 'minLength' | 'digit' | 'lowerCase' | 'upperCase' | 'specialCharacter'>, string> {
  return {
    digit: errorsScope('password.digit'),
    maxLength: errorsScope('password.maxLength'),
    specialCharacter: errorsScope('password.specialCharacter'),
    minLength: errorsScope('password.minLength'),
    upperCase: errorsScope('password.upperCase'),
    lowerCase: errorsScope('password.lowerCase'),
  };
}
