import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFormGroup } from '@rxweb/types';
import { WireForm } from 'src/app/directives/wire-form copy';
import { Nullable } from 'src/app/models/nullable.type';
import { DeaSubUserApiService } from 'src/app/services/dea-sub-user-api.service';
import { RolesService } from 'src/app/services/roles.service';
import { createDeaAddSubUserFormGroup } from './add-user-prompt-form.group';
import { DeaAddSubUserFormModel } from './add-user-prompt-form.model';

@Component({
  selector: 'dea-users-add-user-form',
  templateUrl: './add-user-prompt-form.component.html'
})
export class DeaAddUserFormComponent extends WireForm<DeaAddSubUserFormModel> implements OnInit {

  @Input()
  public importUsersBtnClickAction: Nullable<() => void> = null;

  @Input()
  public downloadTemplateBtnClickAction: Nullable<() => void> = null;
  @Input() userModel: any;
  userInfo: any;
  public form: FormGroup;
  @Output() refreshList = new EventEmitter;
  constructor(private deaSubUserApiService: DeaSubUserApiService,
    private rolesService: RolesService,
    private readonly fb: FormBuilder,
    private readonly dialogService: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    super();
  }
  protected override buildFormGroup(): IFormGroup<DeaAddSubUserFormModel> {
    return createDeaAddSubUserFormGroup();
  }
  public updateFlag: boolean = false;
  public ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    })
    this.userInfo = this.rolesService.getuserInfoSubject();
    setTimeout(() => {
      if (this.userModel) {
        this.form.patchValue({
          firstName: this.userModel.firstName,
          middleName: this.userModel.middleName,
          lastName: this.userModel.lastName,
          position: this.userModel.position,
          email: this.userModel.email,
          phoneNumber: this.userModel.phoneNumber
        })
        this.updateFlag = true;
      }
    }, 2000)

  }
  onSubmit() {
    if (this.form.valid) {
      const data = {
        data: {
          attributes: this.form.value
        }
      }
      if (this.updateFlag) {
        this.deaSubUserApiService.updateUser(data, JSON.parse(sessionStorage.getItem('user')).id).subscribe(
          (Response) => {
            console.log("Response of update API", Response);
            this.refreshList.emit(true)
            this._snackBar.open('User Updated', 'Successfully');
          },
          (Error) => {
            console.log("Error of update API", Error);
          }
        )
      } else {
        this.deaSubUserApiService.addUser(data, JSON.parse(sessionStorage.getItem('user')).id).subscribe(
          (Response) => {
            console.log("Response of Add API", Response);
            this.refreshList.emit(true)
            this._snackBar.open('User Added', 'Successfully');
          },
          (Error) => {
            console.log("Error of Add API", Error);
          }
        )
      }

    }

    this.formSubmitted.subscribe((payload: any) => {
      // payload.id = this.userInfo[0].attributes.id;
      console.log("Sessions", JSON.parse(sessionStorage.getItem('user')))
      this.deaSubUserApiService.addOne(payload, JSON.parse(sessionStorage.getItem('user')).id).subscribe({
        next: (resp: any) => {
          console.log(resp);

        }
      })

    })
  }
  public get firstName(): AbstractControl | null {
    return this._formGroup?.get('firstName');
  }

  public get middleName(): AbstractControl | null {
    return this._formGroup?.get('middleName');
  }

  public get lastName(): AbstractControl | null {
    return this._formGroup?.get('lastName');
  }

  public get position(): AbstractControl | null {
    return this._formGroup?.get('position');
  }

  public get email(): AbstractControl | null {
    return this._formGroup?.get('email');
  }

  public get phoneNumber(): AbstractControl | null {
    return this._formGroup?.get('phoneNumber');
  }


}
