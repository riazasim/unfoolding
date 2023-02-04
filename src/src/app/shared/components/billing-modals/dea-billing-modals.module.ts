import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeaPaymentModalComponent } from './payment/dea-payment-modal.component';


@NgModule({
  declarations: [
    DeaPaymentModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatRippleModule
  ],
  exports: [
    DeaPaymentModalComponent
  ]
})
export class DeaBillingModalsModule { }
