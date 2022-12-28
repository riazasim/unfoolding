import { ModuleWithProviders, NgModule } from '@angular/core';
import { API_NAMESPACE, API_ROOT } from './injection-tokens';

type GenericApiModuleConfig<NS> = {
  namespace: NS,
  root: string
}

@NgModule()
export class GenericApiModule {
  static forRoot<NS>(config: GenericApiModuleConfig<NS>): ModuleWithProviders<GenericApiModule> {
    return {
      ngModule: GenericApiModule,
      providers: [
        {
          provide: API_ROOT,
          useValue: config.root
        },
        {
          provide: API_NAMESPACE,
          useValue: config.namespace
        }
      ]
    };
  }
}
