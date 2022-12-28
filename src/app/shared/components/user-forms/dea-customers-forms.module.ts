import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DeaEditCustomerFormComponent } from './edit-customer/dea-edit-customer-form.component';


@NgModule({
  declarations: [
    DeaEditCustomerFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    TranslocoModule
  ],
  exports: [
    DeaEditCustomerFormComponent
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: 'forms' }
  ]
})
export class DeaCustomersFormsModule { }
