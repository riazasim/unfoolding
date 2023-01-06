import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeaBillingModalsModule } from 'src/app/shared/components/billing-modals/dea-billing-modals.module';
import { DeaBillingProfileModule } from 'src/app/shared/components/dea-billing-profile/dea-billing-profile.component';
import { DeaBillingPromptsModule } from 'src/app/shared/components/billing-prompts/dea-billing-prompts.module';
import { DeaBillingTablesModule } from 'src/app/shared/components/billing-tables/dea-billing-tables.module';
import { CardModule } from 'src/app/shared/components/cards/card.module';
import { ConfirmModalModule } from 'src/app/shared/components/confirm/confirm-modal.module';
import { DeaBillingFormsModule } from 'src/app/shared/components/forms-billing/dea-billing-forms.module';
import { SpAccessRaisedCardGridItemModule } from 'src/app/shared/components/grid-items/sp-access-raised-card-grid-item';
import { GridPresentationLayoutModule } from 'src/app/shared/components/grid-presentation/grid-presentation-layout.component';
import { OffCanvasModule } from 'src/app/shared/components/offcanvas/offcanvas.component';
import { PaymentCardModule } from 'src/app/shared/components/payment-card/payment-card.module';
import { SearchbarModule } from 'src/app/shared/components/searchbar/searchbar.component';
import { DeaBillingStoreModule } from 'src/app/shared/billing-store/store.module';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingHistoryComponent } from './pages/billing-history/billing-history.component';
import { BillingProfilesComponent } from './pages/billing-profiles/billing-profiles.component';
import { InvoiceComponent } from './pages/invoices/invoice.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { ProductsComponent } from './pages/products/products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpAccessPromptsModule } from 'src/app/shared/components/prompts/sp-access-prompts.module';
import { MatTabsModule } from '@angular/material/tabs';
import { LineChartModule, PieChartModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [
    BillingProfilesComponent,
    BillingHistoryComponent,
    PaymentMethodsComponent,
    ProductsComponent,
    InvoiceComponent,
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    DeaBillingPromptsModule,
    DeaBillingProfileModule,
    DeaBillingTablesModule,
    DeaBillingModalsModule,
    DeaBillingFormsModule,
    DeaBillingStoreModule,
    MatRippleModule,
    GridPresentationLayoutModule,
    CardModule,
    SpAccessRaisedCardGridItemModule,
    SearchbarModule,
    ConfirmModalModule,
    OffCanvasModule,
    PaymentCardModule,
    FontAwesomeModule,
    SharedModule,
    SpAccessPromptsModule,
    MatTabsModule,
    LineChartModule,
    PieChartModule
    
  ]
})
export class BillingModule {}
