import { Directive } from '@angular/core';
import { GenericRef } from './generic-ref';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[spAccessCustomRef]'
})
export class CustomRefDirective<T> extends GenericRef<T>{ }
