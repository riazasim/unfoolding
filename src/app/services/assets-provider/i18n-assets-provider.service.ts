import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { AssetsProviderService } from './assets-provider.service';


@Injectable()
export class I18nAssetsProviderService implements TranslocoLoader {
  constructor(private readonly http: HttpClient,
              private readonly assetsProvider: AssetsProviderService<'i18n'>) {
  }

  getTranslation(lang: string) {
    return this.http.get<Translation>(this.assetsProvider.requestTranslationAssetSrc(lang));
  }
}
