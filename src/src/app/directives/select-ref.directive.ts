import { Directive } from '@angular/core';
import { GenericRef } from './generic-ref';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'select[inputRef]'
})
export class SelectRefDirective extends GenericRef<HTMLSelectElement>{ }
