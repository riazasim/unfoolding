import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardIconPipe } from './card-icon.pipe';
import { PaymentCardComponent } from './payment-card.component';

@NgModule({
  declarations: [
    PaymentCardComponent,
    CardIconPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PaymentCardComponent,
    CardIconPipe
  ]
})
export class PaymentCardModule { }
