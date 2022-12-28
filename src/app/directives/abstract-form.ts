import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFormGroup } from '@rxweb/types';

/**
 * An abstract form class.
 * The directive decorator allows it to implement lifecycle hooks and use angular
 * decorators.
 * It is a generic class that receives 3 types:
 * I => the input seed,
 * F => the form value type,
 * O => the output value of the form.
 *
 * This class has the following lifecycle:
 * 1) If a seed is supplied, it will create the form group and use the `convertSeedToFormValue` function to convert I to F
 * 2) The ngOnInit function gets called and it will create the form group if it wasn`t created on step 1
 * 3) Another seed can be supplied or a user can input data in the fields
 * 4) On submit, if the field is valid, it will be transformed from F to O and passed outside
 *
 * It also contains an @Input decorated id property so that a
 * form can be submitted/reset from outside buttons
 *
 * To listen to changes, implement the valueChangeListener() method;
 *
 */
@Directive()
export abstract class AbstractForm<I, F = I, O = I> implements OnInit {

  @Input()
  public id: string | null = null;

  @Input()
  public onSeedBehaviour: 'reset' | 'validate' | 'none' = 'reset';

  @Input()
  public set seed(seed: I | null | undefined) {
    if (this._formGroup === undefined) {
      this._formGroup = this.buildFormGroup();
    }
    if (seed == null) {
      this._formGroup.reset();
      return;
    }
    this._formGroup.patchValue(this.convertSeedToFormValue(seed));
    if (this.onSeedBehaviour === 'reset') {
      this._formGroup.markAsPristine();
      this._formGroup.markAsUntouched();
    } else if (this.onSeedBehaviour === 'validate') {
      this._formGroup.markAllAsTouched();
      this._formGroup.markAsDirty();
    }

  }

  @Output()
  private readonly formSubmitted = new EventEmitter<O>();

  protected _formGroup!: IFormGroup<F>;

  protected abstract buildFormGroup(): IFormGroup<F>;

  protected abstract convertSeedToFormValue(seed: I): F;

  protected abstract convertFormToOutputValue(data: F): O;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected valueChangeListener(formGroup: IFormGroup<F>): void {
    return;
  }

  public submit(): void {
    this._formGroup.markAllAsTouched();
    this._formGroup.markAsDirty();
    if (this._formGroup.valid) {
      const formValue = this._formGroup.getRawValue();
      if (formValue !== null) {
        const output = this.convertFormToOutputValue(formValue);
        this.formSubmitted.emit(output);
      }
    }
  }

  public ngOnInit(): void {
    if (this._formGroup === undefined) {
      this._formGroup = this.buildFormGroup();
    }
    this.valueChangeListener(this._formGroup);
  }

  public get formGroup(): UntypedFormGroup {
    return this._formGroup as UntypedFormGroup;
  }

}
