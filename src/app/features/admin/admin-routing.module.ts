import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AdminComponent } from './admin.component';

const adminLevelNavigation = environment.navigation.admin;

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: adminLevelNavigation.pages.dashboard
      },
      {
        path: adminLevelNavigation.pages.dashboard,
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: adminLevelNavigation.pages.users,
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
      },
      {
        path: adminLevelNavigation.pages.customer,
        loadChildren: () => import('./modules/customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: adminLevelNavigation.pages.billing,
        loadChildren: () => import('./modules/billing/billing.module').then(m => m.BillingModule)
      },
      {
        path: adminLevelNavigation.pages.usage,
        loadChildren: () => import('./modules/usage/usage.module').then(m => m.UsageModule)
      },
    ]
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
export class AdminRoutingModule {}
