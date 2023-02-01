import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IFormGroup } from '@rxweb/types';
import { WireForm } from 'src/app/directives/wire-form copy';
import { Nullable } from 'src/app/models/nullable.type';
import { DeaSubUserApiService } from 'src/app/services/dea-sub-user-api.service';
import { RolesService } from 'src/app/services/roles.service';
import { createDeaAddSubUserFormGroup } from './add-user-prompt-form.group';
import { DeaAddSubUserFormModel } from './add-user-prompt-form.model';

@Component({
  selector: 'dea-users-add-user-form',
  templateUrl: './add-user-prompt-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeaAddUserFormComponent extends WireForm<DeaAddSubUserFormModel> {

  @Input()
  public importUsersBtnClickAction: Nullable<() => void> = null;

  @Input()
  public downloadTemplateBtnClickAction: Nullable<() => void> = null;
  userInfo: any;
  constructor(private deaSubUserApiService: DeaSubUserApiService,
    private rolesService: RolesService
  ) {
    super();
  }

  protected override buildFormGroup(): IFormGroup<DeaAddSubUserFormModel> {
    return createDeaAddSubUserFormGroup();
  }

  public override ngOnInit(): void {
    this.userInfo = this.rolesService.getuserInfoSubject();
    
    this.formSubmitted.subscribe((payload: any) => {
      debugger;
      // payload.id = this.userInfo[0].attributes.id;

      this.deaSubUserApiService.addOne(payload, this.userInfo[0].attributes.id).subscribe({
        next: (resp: any) => {
          console.log(resp);

        }
      })

    })
  }

  public get firstName(): AbstractControl | null {
    return this._formGroup.get('firstName');
  }

  public get middleName(): AbstractControl | null {
    return this._formGroup.get('middleName');
  }

  public get lastName(): AbstractControl | null {
    return this._formGroup.get('lastName');
  }

  public get position(): AbstractControl | null {
    return this._formGroup.get('position');
  }

  public get email(): AbstractControl | null {
    return this._formGroup.get('email');
  }

  public get phoneNumber(): AbstractControl | null {
    return this._formGroup.get('phoneNumber');
  }


}
