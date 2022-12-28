import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { AssetsProviderService } from './assets-provider.service';
import { I18nAssetsProviderService } from './i18n-assets-provider.service';
import { ASSETS_ROOT } from './injection-tokens';

@NgModule()
export class AssetsProviderModule {
  static forRoot(config?: { root?: string; withI18n?: boolean }): ModuleWithProviders<AssetsProviderModule> {
    return {
      ngModule: AssetsProviderModule,
      providers: [
        AssetsProviderService,
        {
          provide: ASSETS_ROOT,
          useValue: config?.root ?? null
        },
        ...additionalProviders(config?.withI18n)
      ]
    };
  }
}

function additionalProviders(withI18n: boolean | undefined): Provider[] {
  if (withI18n) {
    return [I18nAssetsProviderService];
  }
  return [];
}

