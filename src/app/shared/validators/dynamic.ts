import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * A convenience function to pass an inline validator
 * @param validator
 */
export function dynamicValidation(validator: (formGroup: AbstractControl) => ValidationErrors | null): ValidatorFn {
  return validator;
}

/**
 * Instantly validates a control for a certain validator, and set it`s errors
 * Useful for dynamic validations
 * @param control
 * @param validators
 */
export function instantValidation(control: AbstractControl, validators: ValidatorFn | ValidatorFn[]): void {
  let errors: ValidationErrors | null = null;
  if (Array.isArray(validators)) {
    validators.forEach(validator => {
      const errs = validator(control);
      if (errs) {
        errors = {
          errors,
          ...errs
        };
      }
    });
  } else {
    errors = validators(control);
  }
  control.setErrors(errors);
}


