import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingHistoryComponent } from './pages/billing-history/billing-history.component';
import { BillingOverviewComponent } from './pages/billing-overview/billing-overview.component';
import { BillingProfilesComponent } from './pages/billing-profiles/billing-profiles.component';
import { InvoiceComponent } from './pages/invoices/invoice.component';
import { ManageSubscriptionComponent } from './pages/manage-subscription/manage-subscription.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods.component';
import { ProductsComponent } from './pages/products/products.component';

export const billingHistorySegment = 'history';
export const billingProfilesSegment = 'profiles';
export const paymentMethodsSegment = 'payment-methods';
export const billingOverviewRoute = 'overview';
export const managesubscription = 'subscription';
export const productsSegment = 'products';
export const invoicesSegment = 'invoices';
export const partnersSegment = 'partners';

export type BillingSegment =
  typeof paymentMethodsSegment
  | typeof billingProfilesSegment
  | typeof billingHistorySegment
  | typeof productsSegment
  | typeof invoicesSegment
  | typeof partnersSegment
  | typeof managesubscription
  | typeof billingOverviewRoute;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: billingProfilesSegment
  },
  {
    path: billingProfilesSegment,
    component: BillingProfilesComponent
  },
  {
    path: managesubscription,
    component: ManageSubscriptionComponent
  },
  {
    path: billingOverviewRoute,
    component: BillingOverviewComponent
  },
  {
    path: billingHistorySegment,
    component: BillingHistoryComponent
  },
  {
    path: paymentMethodsSegment,
    component: PaymentMethodsComponent
  },
  {
    path: productsSegment,
    component: ProductsComponent
  },
  {
    path: invoicesSegment,
    component: InvoiceComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule {}
