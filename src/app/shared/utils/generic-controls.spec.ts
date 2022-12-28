import { UntypedFormControl } from '@angular/forms';
import { IFormControl } from '@rxweb/types';
import {
  createDateFormControl,
  createDisabledFormControl,
  createFileControl,
  createLetterOnlyFormControl,
  createMultipleSelectControl,
  createNumericFormControl,
  createRequiredControl,
  createSingleSelectControl
} from './generic-controls';

function expectRequired(target: IFormControl<string[]>) {
  expect(target.errors).not.toBeNull();
  expect(target.errors?.['required']).toBeDefined();
}


describe('function createRequiredControl', () => {

  it('should create a control with the null value', () => {
    const target = createRequiredControl();
    expect(target.value).toBeNull();
  });

  it('should create a required control', () => {
    const target = createRequiredControl();
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should be invalid', () => {
    const target = createRequiredControl();
    expect(target.invalid).toBe(true);
  });

});

describe('function createFileControl', () => {

  it('should create an empty form control', () => {
    const target = createFileControl();
    expect(target.value).toBeNull();
  });

  it('should be required when the required param is unset', () => {
    const target = createFileControl();
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
    expect(target.invalid).toBe(true);
  });

  it('should be required when the required param is true', () => {
    const target = createFileControl(1, 1, 1, 1, true);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
    expect(target.invalid).toBe(true);
  });

  /**
   * Without the required validator, an empty control is always valid
   */
  it('should not be required when the required param is false', () => {
    const target = createFileControl(1, 1, 1, 1, false);
    expect(target.errors).toBeNull();
    expect(target.valid).toBe(true);
  });

  /**
   * As of now, I do not know how to test the file validators with JEST.
   */
});

describe('function createSingleSelectControl', () => {

  const matchValues = ['a', 'b', 'c', 'd'];

  it('should be required when the required param is not specified', () => {
    const target = createSingleSelectControl(matchValues);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should be required when the required param is true', () => {
    const target = createSingleSelectControl(matchValues, true);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should not be required when the required param is false', () => {
    const target = createSingleSelectControl(matchValues, false);
    expect(target.errors).toBeNull();
  });

  it('should be valid on matched values', () => {
    const target = createSingleSelectControl(matchValues);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();

    matchValues.forEach(val => {
      target.setValue(val);
      expect(target.errors).toBeNull();
      expect(target.valid).toBe(true);
    });

  });

  it('should be invalid on non-matched values', () => {
    const target = createSingleSelectControl(matchValues);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();

    const falseMatches = ['aa', 'bb', 'cc', 'dd', 'ee'];
    falseMatches.forEach(val => {
      target.setValue(val);
      expect(target.errors).not.toBeNull();
      expect(target.errors?.['oneOf']).toBeDefined();
    });

  });
});

describe('function createMultipleSelectControl', () => {
  const matchValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  function expectEmptyChoiceToBeInvalid(target: IFormControl<string[]>) {
    target.setValue([]);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['choice']).toBeDefined();
  }

  it('should be required when the required param is not specified', () => {
    const target = createMultipleSelectControl(matchValues);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should be required when the required param is true', () => {
    const target = createMultipleSelectControl(matchValues, 1, 1, true);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should not be required when the required param is false', () => {
    const target = createMultipleSelectControl(matchValues, 1, 1, false);
    expect(target.errors).toBeNull();
  });

  it('should be invalid with less than minLength selected matched values', () => {
    const minLength = 3;
    const target = createMultipleSelectControl(matchValues, minLength);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();

    target.setValue([]);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['choice']).toBeDefined();

    matchValues.slice(0, minLength - 1).forEach((val) => {
      let value = target.value as string[];
      value = [...value, val];
      target.setValue(value);
      expect(target.errors).not.toBeNull();
      expect(target.errors?.['choice']).toBeDefined();
    });

  });

  it('should be invalid with more than maxLength selected matched values', () => {
    const minLength = 1;
    const maxLength = matchValues.length - 2;
    const target = createMultipleSelectControl(matchValues, minLength, maxLength);
    expectRequired(target);
    expectEmptyChoiceToBeInvalid(target);

    target.setValue(matchValues);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['choice']).toBeDefined();

  });

  it('should be valid with matched values between min and max', () => {
    const minLength = 1;
    const maxLength = 4;
    const target = createMultipleSelectControl(matchValues, minLength, maxLength);
    expectRequired(target);
    expectEmptyChoiceToBeInvalid(target);

    const slice = matchValues.slice(0, maxLength);

    slice.forEach((_, i, arr) => {
      target.setValue(arr.slice(0, i + 1));
      expect(target.valid).toBe(true);
    });

  });

  it('should have no upper limit when maxLength is undefined', () => {
    const target = createMultipleSelectControl(matchValues, 1, undefined);
    expectRequired(target);

    target.setValue([...matchValues, ...matchValues, ...matchValues, ...matchValues]);
    expect(target.valid).toBe(true);

  });

});

describe('function createDateFormControl', () => {

  it('should be required when the required param is not specified', () => {
    const target = createDateFormControl();
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should be required when the required param is true', () => {
    const target = createDateFormControl(true);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should not be required when the required param is false', () => {
    const target = createDateFormControl(false);
    expect(target.errors).toBeNull();
  });

  it('should be valid on a valid JS date object', () => {
    const target = createDateFormControl(true);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();

    const validDate = new Date();
    target.setValue(validDate);

    expect(target.errors).toBeNull();
    expect(target.valid).toBe(true);

  });

  it('should be invalid on invalid JS date object', () => {
    const target = createDateFormControl(true);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();

    const invalidDate = new Date('garbage');
    target.setValue(invalidDate);

    expect(target.errors).not.toBeNull();
    expect(target.errors?.['date']).toBeDefined();
    expect(target.invalid).toBe(true);
  });
});

describe('function createNumericFormControl', () => {

  it('should be required when the required param is not specified', () => {
    const target = createNumericFormControl();
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should be required when the required param is true', () => {
    const target = createNumericFormControl(undefined, undefined, true);
    expect(target.errors).not.toBeNull();
    expect(target.errors?.['required']).toBeDefined();
  });

  it('should not be required when the required param is false', () => {
    const target = createNumericFormControl(undefined, undefined, false);
    expect(target.errors).toBeNull();
  });

  it('should be valid on a number input', () => {
    const target = createNumericFormControl(undefined, undefined, false);
    expect(target.valid).toBe(true);
    target.setValue(5);
    expect(target.valid).toBe(true);
  });

  it('should be invalid on an input that is not number', () => {
    const target = createNumericFormControl(undefined, undefined, false);
    expect(target.valid).toBe(true);
    target.setValue('garbage' as unknown as number);
    expect(target.valid).toBe(false);
  });

  it('should be invalid when the input is less than min', () => {
    const target = createNumericFormControl(0, undefined, false);
    expect(target.valid).toBe(true);
    target.setValue(-10);
    expect(target.valid).toBe(false);
  });

  it('should be valid when the input is greater than min', () => {
    const target = createNumericFormControl(0, undefined, false);
    expect(target.valid).toBe(true);
    target.setValue(10);
    expect(target.valid).toBe(true);
  });

  it('should be invalid when the input is greater than max', () => {
    const target = createNumericFormControl(undefined, 10, false);
    expect(target.valid).toBe(true);
    target.setValue(100);
    expect(target.valid).toBe(false);
  });

  it('should be valid when the input is less than max', () => {
    const target = createNumericFormControl(undefined, 100, false);
    expect(target.valid).toBe(true);
    target.setValue(99);
    expect(target.valid).toBe(true);
  });

  it('should be valid when the input is between min and max', () => {
    const target = createNumericFormControl(0, 100, false);
    expect(target.valid).toBe(true);
    target.setValue(55);
    expect(target.valid).toBe(true);
  });

  it('should be invalid when the input is outside the [min,max] interval', () => {
    const target = createNumericFormControl(0, 100, false);
    expect(target.valid).toBe(true);
    target.setValue(99 ** 2);
    expect(target.valid).toBe(false);
  });

});

describe('function createDisabledFormControl', () => {
  it('should create a disabled control with the null value', () => {
    const target = createDisabledFormControl();
    expect(target.disabled).toBe(true);
    expect(target.value).toBeNull();
  });
});

describe('function createLetterOnlyFormControl', () => {
  it('should accept letters and be valid', () => {
    const target = createLetterOnlyFormControl(false);
    expect(target.errors).toBeNull();
    target.setValue('abc');
    expect(target.valid).toEqual(true);
  });

  it('should be invalid on other values', () => {
    const target = createLetterOnlyFormControl(false) as UntypedFormControl;
    expect(target.errors).toBeNull();
    target.setValue(2213);
    expect(target.valid).toEqual(false);
  });

});

