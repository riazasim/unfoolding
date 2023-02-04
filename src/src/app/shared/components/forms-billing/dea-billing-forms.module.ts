import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { PaymentCardModule } from '../payment-card/payment-card.module';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { DeaBillingProfileFormComponent } from './billing-profile/dea-billing-profile-form.component';
import { DeaInvoiceFormComponent } from './invoice/dea-invoice-form.component';
import { DeaPaymentMethodFormComponent } from './payment-method/dea-payment-method-form.component';
import { DeaProductFormComponent } from './product/dea-product-form.component';
import { SpAccessCardIconPipe } from 'src/app/core/pipes/sp-access-card-icon.pipe';
import { PaymentMethodFormComponent } from '../billing-forms/payment-method-form.component';
import { BillingHistoryTableComponent } from '../admin-billing-history-table/billing-history-table.component';
import { BillingProfileComponent } from '../billing-profile/billing-profile.component';
import { AddBillingProfilePromptComponent } from '../add-profile-prompt/add-billing-profile-prompt.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SpAccessPromptsModule } from '../prompts/sp-access-prompts.module';

@NgModule({
  declarations: [
    DeaBillingProfileFormComponent,
    DeaPaymentMethodFormComponent,
    DeaProductFormComponent,
    DeaInvoiceFormComponent,
    PaymentMethodFormComponent,
    BillingHistoryTableComponent,
    BillingProfileComponent,
    AddBillingProfilePromptComponent,
    PaymentModalComponent,
    SpAccessCardIconPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CdkTableModule,
    NgScrollbarModule,
    SpAccessPromptsModule,
    MatPaginatorModule,
    RxReactiveFormsModule,
    CreditCardDirectivesModule,
    PaymentCardModule,
    TranslocoModule
  ],
  exports: [
    DeaBillingProfileFormComponent,
    DeaPaymentMethodFormComponent,
    PaymentMethodFormComponent,
    BillingHistoryTableComponent,
    BillingProfileComponent,
    AddBillingProfilePromptComponent,
    PaymentModalComponent,
    DeaProductFormComponent,
    DeaInvoiceFormComponent,
  ],
  providers: [
    SpAccessCardIconPipe,
    { provide: TRANSLOCO_SCOPE, useValue: 'forms' }
  ]
})
export class DeaBillingFormsModule {}
