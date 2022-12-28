import { ValidatorFn } from '@angular/forms';
import { NumericValueType, RxwebValidators } from '@rxweb/reactive-form-validators';
import { PasswordValidation } from '@rxweb/reactive-form-validators/models';
import { IFormControl } from '@rxweb/types';

/**
 * @param minFiles
 * @param maxFiles
 * @param minSize
 * @param maxSize
 */
export function createFileValidators(minFiles: number, maxFiles: number | undefined, minSize: number | undefined, maxSize: number | undefined): ValidatorFn[] {
  return [
    RxwebValidators.file({
        minFiles,
        maxFiles,
        // message: ValidationMessages.fileCountValidationMessage(minFiles, maxFiles)
        message: 'File count validation message'
      }
    ),
    RxwebValidators.fileSize({
      minSize,
      maxSize,
      // message: ValidationMessages.fileSizeValidationMessage(minSize, maxSize)
      message: 'File size validation message'
    })];
}

/**
 * @param matchValues
 */
export function createSingleSelectValidators<T>(matchValues: T[]): ValidatorFn[] {
  return createMultipleSelectValidators(matchValues, 1, 1);
}

/**
 * @param matchValues
 * @param minLength
 * @param maxLength
 */
export function createMultipleSelectValidators<T>(matchValues: T[], minLength: number = 1, maxLength: number | undefined = undefined): ValidatorFn[] {
  return [
    RxwebValidators.oneOf({
        matchValues,
        message: 'One of validation message'
      }
    ),
    RxwebValidators.choice(
      {
        minLength,
        maxLength,
        message: 'Choice validation message'
      }
    )
  ];
}

/**
 * Creates the validators for the numeric controls
 * @param min
 * @param max
 */
export function createNumericIntervalsValidators(min: number | undefined, max: number | undefined): ValidatorFn[] {
  const validators: ValidatorFn[] = [
    RxwebValidators.numeric({
      message: 'Numeric validation message',
      acceptValue: NumericValueType.Both
    })
  ];
  const validationMessage = 'Numeric validation message';
  const isMinNum = typeof min === 'number';
  const isMaxNum = typeof max === 'number';

  if (isMinNum && isMaxNum) {
    validators.push(RxwebValidators.range({
      minimumNumber: min,
      maximumNumber: max,
      message: validationMessage
    }));
  } else if (isMinNum) {
    validators.push(RxwebValidators.minNumber({
      value: min,
      message: validationMessage
    }));
  } else if (isMaxNum) {
    validators.push(RxwebValidators.maxNumber({
      value: max,
      message: validationMessage
    }));
  }

  return validators;
}

/**
 * Creates the validators for an image file input
 * @param minImageCount
 * @param maxImageCount
 * @param width
 * @param height
 */
export function createImageValidators(minImageCount: number,
                                      maxImageCount: number | undefined,
                                      width: { min: number; max: number },
                                      height: { min: number; max: number }): ValidatorFn[] {
  return [
    RxwebValidators.file({
      minFiles: minImageCount,
      maxFiles: maxImageCount,
      message: 'File count validation message'
    }),
    RxwebValidators.image({
      message: 'Image validation message',
      minHeight: height.min,
      maxHeight: height.max,
      maxWidth: width.max,
      minWidth: width.min
    })
  ];
}

/**
 * Creates the validators for a letters only control
 */
export function createLetterValidators(): ValidatorFn[] {
  return [
    RxwebValidators.alpha({
      message: 'Letter validation message'
    })
  ];
}

export function createAlphaNumericValidators(): ValidatorFn[] {
  return [
    RxwebValidators.alphaNumeric({
      message: 'Alpha numeric validation message'
    })
  ];
}


export function createMinLengthValidator(minLength: number): ValidatorFn[] {
  return [
    RxwebValidators.minLength({
      value: minLength,
      message: 'Min length validation message'
    })
  ];
}

export function createMaxLengthValidator(maxLength: number): ValidatorFn[] {
  return [
    RxwebValidators.maxLength({
      value: maxLength,
      message: 'Max length validation message'
    })
  ];
}

export function createExactLengthValidator(length: number): ValidatorFn[] {
  return [
    RxwebValidators.compose({
      validators: [
        RxwebValidators.minLength({
          value: length
        }),
        RxwebValidators.maxLength({
          value: length
        })
      ],
      message: 'Exact length validation message'
    })
  ];
}

export function createCompareValidator(fieldName: string): ValidatorFn[] {
  return [
    RxwebValidators.compare({
      fieldName,
      message: 'Compare validation message'
    })
  ];
}

export function appendValidators<T extends IFormControl<unknown>>(formControl: T, validators: ValidatorFn | ValidatorFn[]): T {
  formControl.addValidators(validators);
  return formControl;
}

export function createEmailValidator(): ValidatorFn[] {
  return [
    RxwebValidators.email({ message: 'Email validation message' })
  ];
}

export function createDigitOnlyValidator(): ValidatorFn[] {
  return [
    RxwebValidators.digit({ message: '' })
  ];
}

export function createPasswordValidator(validation: Partial<Pick<PasswordValidation, 'maxLength' | 'minLength' | 'digit' | 'lowerCase' | 'upperCase' | 'specialCharacter'>>): ValidatorFn[] {
  return [
    RxwebValidators.password({
      validation,
      message: 'Password validation message'
    })
  ];
}

export function createLessThanEqualValidator(fieldName: string): ValidatorFn[] {
  return [
    RxwebValidators.lessThanEqualTo({
      fieldName,
      message: 'Less than equal validation message'
    })
  ];
}
