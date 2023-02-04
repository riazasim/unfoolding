import { Component, ContentChild, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { InputRefDirective } from 'src/app/directives/input-ref.directive';
import { GenericWrapperComponent } from '../../utils/generic-wrapper.component';

@Component({
  selector: '[iconic-input-wrapper]',
  templateUrl: './iconic-input-wrapper.component.html'
})
export class IconicInputWrapperComponent extends GenericWrapperComponent<HTMLInputElement, InputRefDirective>{

  @Input()
  public rightIcon: IconProp | undefined;

  @Input()
  public leftSvg: string | undefined;

  @ContentChild(InputRefDirective)
  override set inputRef(ref: InputRefDirective) {
    this._inputRef = ref;
  }

}
