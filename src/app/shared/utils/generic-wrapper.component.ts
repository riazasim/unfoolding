import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import { GenericRef } from 'src/app/directives/generic-ref';

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericWrapperComponent<T1, T2 extends GenericRef<T1>> {
  protected _inputRef: T2 | undefined;

  protected readonly _checkmark = faCheck;

  @Input()
  public showValidation = true;

  @Input()
  public leftIcon: IconProp | undefined;

  @Input()
  public withCheckmark = true;

  @Input()
  public appendedTemplate: TemplateRef<unknown> | undefined;

  @Input()
  public validationMessagesMetadata: { [key: string]: string } | undefined;

  @Input()
  public showValidationMessages = true;

  set inputRef(ref: T2) {
    this._inputRef = ref;
  }

  get checkmark(): typeof faCheck {
    return this._checkmark;
  }

  get isValid(): boolean | undefined {
    return this.showValidation ? this._inputRef?.control?.valid : undefined;
  }

  get errors(): ValidationErrors | null {
    const formControl = this._inputRef?.control;
    if (formControl === undefined || !this.showValidation) {
      return null;
    }
    return formControl?.errors;
  }

  get isDisabled(): boolean | undefined {
    return this._inputRef?.control?.disabled;
  }

  get isTouched(): boolean | undefined {
    return this._inputRef?.control?.touched ?? false;
  }

  get isDirty(): boolean | undefined {
    return this._inputRef?.control?.dirty ?? false;
  }

}
