import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SpAccessThumbnailLoadInputWrapperModule } from '../thumbnail-load-input-wrapper/thumbnail-load-input-wrapper.component';
import { DeaAddUserFormComponent } from './add-user-prompt-form/add-user-prompt-form.component';


@NgModule({
  declarations: [
    DeaAddUserFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SpAccessThumbnailLoadInputWrapperModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatRippleModule,
    TranslocoModule
  ],
  exports: [
    DeaAddUserFormComponent
  ],
  providers:[
    { provide: TRANSLOCO_SCOPE, useValue: 'forms' }
  ]
})
export class DeaUserFormsModule { }
