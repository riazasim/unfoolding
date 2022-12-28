import { Directive } from '@angular/core';
import { AbstractForm } from './abstract-form';

/**
 * A wire form is a special kind of form that has the
 * same type of data for input, form and output
 * Implement this abstract class further to create your own forms
 */
@Directive()
export abstract class WireForm<T> extends AbstractForm<T> {

  protected override convertSeedToFormValue(seed: T): T {
    return seed;
  }

  protected override convertFormToOutputValue(data: T): T {
    return data;
  }

}
