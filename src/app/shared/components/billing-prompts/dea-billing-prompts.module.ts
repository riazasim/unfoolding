import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { SpAccessPromptsModule } from '../prompts/sp-access-prompts.module';
import { DeaAddBillingProfilePromptComponent } from './add-billing-profile/dea-add-billing-profile-prompt.component';

import { DeaAddPaymentMethodPromptComponent } from './add-payment-method/add-payment-method-prompt.component';


@NgModule({
  declarations: [
    DeaAddPaymentMethodPromptComponent,
    DeaAddBillingProfilePromptComponent
  ],
  imports: [
    CommonModule,
    SpAccessPromptsModule,
    MatRippleModule
  ],
  exports: [
    DeaAddPaymentMethodPromptComponent,
    DeaAddBillingProfilePromptComponent
  ]
})
export class DeaBillingPromptsModule { }
