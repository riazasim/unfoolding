import { UntypedFormControl } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { IFormControl } from '@rxweb/types';
import {
  createAlphaNumericValidators,
  createEmailValidator,
  createFileValidators,
  createImageValidators,
  createLetterValidators,
  createMultipleSelectValidators,
  createNumericIntervalsValidators,
  createSingleSelectValidators
} from '../validators/generic-validators';

/**
 * Internal
 * @param required
 */
function createControl<T>(required: boolean): IFormControl<T> {
  return required ? createRequiredControl<T>() : new UntypedFormControl(null);
}

/**
 * Creates a required control
 */
export function createRequiredControl<T>(): IFormControl<T> {
  return new UntypedFormControl(
    null,
    [
      // RxwebValidators.required({ message: ErrorMessages.requiredValidationMessage() })
      RxwebValidators.required({ message: 'Required validation message' })
    ]
  );
}

/**
 * Creates a file control
 * @param minFiles - minimum number of files - defaults to 1
 * @param maxFiles - maximum number of allowed files - defaults to undefined - that is, as there is not upper limit
 * @param minSize - minimum file size - defaults to 0 - that is, no min file size
 * @param maxSize - maximum file size - defaults to undefined - that is no upper limit
 * @param required - if it should be required - defaults to true
 */
export function createFileControl(minFiles: number = 1,
                                  maxFiles: number | undefined = undefined,
                                  minSize: number = 0,
                                  maxSize: number | undefined = undefined,
                                  required = true): IFormControl<File> {
  const formControl = createControl<File>(required);
  formControl.addValidators(createFileValidators(minFiles, maxFiles, minSize, maxSize));
  return formControl;
}

export function createImageControl(width: { min: number, max: number },
                                   height: { min: number, max: number },
                                   minImageCount: number = 1,
                                   maxImageCount: number | undefined = undefined,
                                   required = true): IFormControl<FileList> {
  const formControl = createControl<FileList>(required);
  formControl.addValidators(createImageValidators(minImageCount, maxImageCount, width, height));
  return formControl;
}

/**
 * Creates a control used to select a SINGLE value from a given list
 * @param matchValues - the accepted values
 * @param required - if it should be required - defaults to true
 */
export function createSingleSelectControl<T>(matchValues: T[], required = true): IFormControl<T> {
  const formControl = createControl<T>(required);
  formControl.addValidators(createSingleSelectValidators(matchValues));
  return formControl;
}

/**
 * Creates a control used to select multiple values from a given list
 * @param matchValues - the accepted values
 * @param minLength - the minimum accepted number of selected values - default to 1
 * @param maxLength - the maximum accepted number of selected values - defaults to undefined that is no upper limit
 * @param required -  if it should be required - defaults to true
 */
export function createMultipleSelectControl<T>(matchValues: T[], minLength: number = 1, maxLength: number | undefined = undefined, required = true): IFormControl<T[]> {
  const formControl = createControl<T[]>(required);
  formControl.addValidators(createMultipleSelectValidators(matchValues, minLength, maxLength));
  return formControl;
}

/**
 * Creates a control used for Javascript Date Objects
 * @param required -  if it should be required - defaults to true
 */
export function createDateFormControl(required: boolean = true): IFormControl<Date> {
  const formControl = createControl<Date>(required);
  formControl.addValidators([RxwebValidators.date({
    allowISODate: true
  })]);
  return formControl;
}

/**
 * Create a control used to validate number inputs
 * @param min
 * @param max
 * @param required   if it should be required - defaults to true
 */
export function createNumericFormControl(min: number | undefined = undefined, max: number | undefined = undefined, required: boolean = true): IFormControl<number> {
  const formControl = createControl<number>(required);
  formControl.addValidators(createNumericIntervalsValidators(min, max));
  return formControl;
}

/**
 * Creates a disabled form control
 */
export function createDisabledFormControl<T>(initialValue: T | null = null): IFormControl<T> {
  return new UntypedFormControl({ value: initialValue, disabled: true });
}

export function createLetterOnlyFormControl(required: boolean = true): IFormControl<string> {
  const formControl = createControl<string>(required);
  formControl.addValidators(createLetterValidators());
  return formControl;
}

export function createEmailControl(required: boolean = true): IFormControl<string> {
  const formControl = createControl<string>(required);
  formControl.addValidators(createEmailValidator());
  return formControl;
}

export function createAlphaNumericFormControl(required: boolean = true): IFormControl<string> {
  const formControl = createControl<string>(required);
  formControl.addValidators(createAlphaNumericValidators());
  return formControl;
}
