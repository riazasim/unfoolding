import { Location } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { LocalizeRouterSettings } from "@gilsdav/ngx-translate-router";
import { LocalizeRouterHttpLoader } from "@gilsdav/ngx-translate-router-http-loader";
import { TranslateService } from "@ngx-translate/core";

export const translateFactory = (translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) => 
                                new LocalizeRouterHttpLoader(translate, location, settings, http);
