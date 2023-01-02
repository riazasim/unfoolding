import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SpAccessAdminLayoutModule } from 'src/app/shared/components/admin-layout/sp-access-admin-layout.component';
import { CurrentLocationModule } from 'src/app/shared/components/current-location/current-location.module';
import { SpAccessLoaderModule } from 'src/app/shared/components/loader/loader.component';
import { SpAccessModernHeaderModule } from 'src/app/shared/components/modern-header/sp-access-modern-header.component';
import { SpAccessModernNavigationMenuModule } from 'src/app/shared/components/modern-navigation/sp-access-modern-navigation-menu.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { deaCurrentLocationMapFactory } from 'src/app/shared/utils/dea-current-location-map.factory';
import { environment } from '../../../environments/environment';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SpAccessAdminLayoutModule,
    SpAccessModernHeaderModule,
    SpAccessLoaderModule,
    SpAccessModernNavigationMenuModule,
    CurrentLocationModule.withMap({ locationsMap: deaCurrentLocationMapFactory(environment.navigation) }),
    FontAwesomeModule,
    MatBadgeModule,
    MatDialogModule,
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    SharedModule
  ]
})
export class AdminModule {}
