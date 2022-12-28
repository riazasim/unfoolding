import { Component, ContentChild, Input } from '@angular/core';
import { SelectRefDirective } from 'src/app/directives/select-ref.directive';
import { GenericWrapperComponent } from '../../utils/generic-wrapper.component';

@Component({
  selector: '[iconic-select-wrapper]',
  templateUrl: './iconic-select-wrapper.component.html',
  styles: [
    `
    .select-container {
        position: relative;
        flex-grow: 1;
        display: flex;
      }
    .select-decoration {
        position: absolute;
        right: 10px;
        color: black;
      }
    `
  ]
})
export class IconicSelectWrapperComponent extends GenericWrapperComponent<HTMLSelectElement, SelectRefDirective> {

  @Input()
  // public readonly rightIcon: IconProp = faAngleDown;
  public readonly rightIcon = null;

  @ContentChild(SelectRefDirective)
  override set inputRef(ref: SelectRefDirective) {
    this._inputRef = ref;
  }

}
