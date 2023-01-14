import { CommonModule } from '@angular/common';
import {  NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
import { DeaLoginService } from 'src/app/services/dea-login.service';
import { DeaPasswordService } from 'src/app/services/dea-password.service';
import { DeaRegistrationService } from 'src/app/services/dea-registration.service';
import { GenericApiService } from 'src/app/services/generic-api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SetFirstPasswordComponent } from './pages/set-first-password/set-first-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SpAccessPortalLayoutModule } from './pages/sp-access-portal-layout/sp-access-portal-layout.component';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';


@NgModule({
  declarations: [
    PortalComponent,
    SignInComponent,
    SignUpComponent,
    SetFirstPasswordComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortalRoutingModule,
    SpAccessPortalLayoutModule,
    MatRippleModule,
    MatStepperModule,
    SharedModule
  ],
  providers: [
    DeaLoginService,
    GenericApiService,
    DeaRegistrationService,
    DeaPasswordService,
    
    
  ]
})
export class PortalModule {}
