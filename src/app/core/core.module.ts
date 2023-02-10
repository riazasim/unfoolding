import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BearerTokenInterceptor } from '../services/bearer-token/bearer-token.interceptor';
import { setupFontAwesome } from './setup/font-awesome';
import { RolesSecurityModule } from './pipes/roles-security.module';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { langToLocaleMapping } from './functions/factories';

@NgModule({
  imports: [
    TranslocoModule,
    TranslocoLocaleModule.forRoot({
      defaultLocale: 'en',
      langToLocaleMapping: langToLocaleMapping(),
      localeConfig: {
        global: {
          date: {
            hour12: true
          }
        }
      }
    }),
    RolesSecurityModule,
    HttpClientModule,
    FontAwesomeModule,
    MatSnackBarModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: BearerTokenInterceptor,
    //   multi: true
    // }
  ]
})
export class CoreModule {
  constructor(faConfig: FaConfig, faLibrary: FaIconLibrary) {
    setupFontAwesome(faConfig, faLibrary);
  }
}
