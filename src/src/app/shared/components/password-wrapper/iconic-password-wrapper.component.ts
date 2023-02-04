import { AfterContentInit, Component, ContentChild, } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/pro-regular-svg-icons';
import { InputRefDirective } from 'src/app/directives/input-ref.directive';
import { GenericWrapperComponent } from '../../utils/generic-wrapper.component';


type PasswordState = 'hidden' | 'shown';

@Component({
  selector: '[iconic-password-wrapper]',
  templateUrl: './iconic-password-wrapper.component.html'
})
export class IconicPasswordWrapperComponent
  extends GenericWrapperComponent<HTMLInputElement, InputRefDirective>
  implements AfterContentInit {
  public readonly hidePasswordIcon: IconProp = faEyeSlash;
  public readonly showPasswordIcon: IconProp = faEye;

  public passwordState: PasswordState | undefined;


  @ContentChild(InputRefDirective)
  override set inputRef(ref: InputRefDirective) {
    this._inputRef = ref;
  }

  public ngAfterContentInit(): void {
    const nativeElement = this._inputRef?.nativeElement;
    if (nativeElement) {
      const type = nativeElement.type;
      this.passwordState = type === 'password' ? 'hidden' : 'shown';
    }
  }

  public togglePasswordState(): void {
    this.passwordState = this.passwordState === 'hidden' ? 'shown' : 'hidden';
    const nativeElement = this._inputRef?.nativeElement;
    if (nativeElement) {
      nativeElement.type = this.passwordState === 'hidden' ? 'password' : 'text';
    }
  }

  get actionPasswordIcon(): any {
    return this.passwordState === 'hidden'
      ? this.showPasswordIcon
      : this.hidePasswordIcon;
  }


}
