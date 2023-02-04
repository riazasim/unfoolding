import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SpAccessLoaderModule } from './shared/components/loader/loader.component';
import { DeaLoginService } from './services/dea-login.service';
import { DeaRegistrationService } from './services/dea-registration.service';
import { GenericApiService } from './services/generic-api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './services/dea-http-interceptor';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    FontAwesomeModule,
    SharedModule,
    SpAccessLoaderModule
  ],
  providers: [
    DeaLoginService,
    DeaRegistrationService,
    GenericApiService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
