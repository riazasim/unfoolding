import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() filesToUpload = new EventEmitter;
  public imageSrc: string = '';
  constructor(private deaSubUserApiService: DeaSubUserApiService,
    private rolesService: RolesService,
    private readonly fb: FormBuilder,
    protected readonly cdr: ChangeDetectorRef,
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
        console.log("this.userModel", this.userModel)
        this.form.patchValue({
          firstName: this.userModel.firstName,
          middleName: this.userModel.middleName,
          lastName: this.userModel.lastName,
          position: this.userModel.position,
          email: this.userModel.email,
          phoneNumber: this.userModel.phoneNumber
        })
        this.updateFlag = true;
        // this.imageSrc = 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg';

        this.imageSrc = this.userModel.image ? this.userModel.image : '';
        this.cdr.detectChanges();
      }
    }, 100)
    console.log("imageSrc", this.imageSrc)
  }
  onSubmit() {
    if (this.form.valid) {

      // data1.image = this.imageforData;
      const formData = new FormData();
      formData.append('data[attributes][firstName]', this.form.value.firstName);
      formData.append('data[attributes][middleName]', this.form.value.middleName);
      formData.append('data[attributes][lastName]', this.form.value.lastName);
      formData.append('data[attributes][position]', this.form.value.position);
      formData.append('data[attributes][email]', this.form.value.email);
      formData.append('data[attributes][phoneNumber]', this.form.value.phoneNumber);
      if (this.files.length > 0) {
        for (var j = 0; j < this.files.length; j++) {
          formData.append("image", this.files[j]);
        }
      }
      if (this.updateFlag) {
        this.deaSubUserApiService.updateUser(formData, JSON.parse(sessionStorage.getItem('user')).id).subscribe(
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
        this.deaSubUserApiService.addUser(formData, JSON.parse(sessionStorage.getItem('user')).id).subscribe(
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
      this.deaSubUserApiService.addOne(payload, JSON.parse(sessionStorage.getItem('user')).id).subscribe({
        next: (resp: any) => {
          console.log(resp);

        }
      })

    })
  }
  // public get image(): AbstractControl | null {
  //   return this._formGroup?.get('image');
  // }
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
  download() {
    window.open('/assets/resources/sub_users.csv', '_self');
  }
  public myFiles: any = [];
  onFileChange(files) {
    for (var i of files.target.files) {
      this.myFiles.push(i);
    }
    if (this.myFiles.length > 0) {
      const formData = new FormData();
      for (var j = 0; j < this.myFiles.length; j++) {
        formData.append("importCSV", this.myFiles[j]);
      }
      this.filesToUpload.emit(formData)
    }
    console.log("this.myFiles", this.myFiles)
  }
  public files: any = [];
  public imageforData;
  onImageUpload(files) {
    this.files = [];
    for (var i of files.target.files) {
      this.files.push(i);
    }
    // if (this.files.length > 0) {
    //   const formData = new FormData();
    //   for (var j = 0; j < this.files.length; j++) {
    //     formData.append("image", this.files[j]);
    //   }
    // }
  }
}
