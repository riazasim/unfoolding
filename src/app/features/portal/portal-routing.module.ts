import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SetFirstPasswordComponent } from './pages/set-first-password/set-first-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PortalComponent } from './portal.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'set-password', component: SetFirstPasswordComponent },
      { path: 'forgot-password', component: ForgottenPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule {}
