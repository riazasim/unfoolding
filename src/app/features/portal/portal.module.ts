import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { AssetsProviderService } from 'src/app/services/assets-provider/assets-provider.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SetFirstPasswordComponent } from './pages/set-first-password/set-first-password.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SpAccessPortalLayoutModule } from './pages/sp-access-portal-layout/sp-access-portal-layout.component';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PortalComponent,
    SignInComponent,
    SignUpComponent,
    SetFirstPasswordComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortalRoutingModule,
    SpAccessPortalLayoutModule,
    MatRippleModule,
    MatStepperModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatIconModule,
    
  ],
  providers: []
})
export class PortalModule {}
