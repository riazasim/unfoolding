import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader => 
                                 new TranslateHttpLoader(http, './assets/i18n/', '.json')