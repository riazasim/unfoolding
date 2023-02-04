import { Directive } from '@angular/core';
import { GenericRef } from './generic-ref';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[inputRef]',
})
export class InputRefDirective extends GenericRef<HTMLInputElement>{


}
