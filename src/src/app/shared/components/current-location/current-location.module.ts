import { ModuleWithProviders, NgModule } from '@angular/core';
import { LOCATIONS_MAP } from './injection-tokens';
import { LocationMap } from './location-map.type';

@NgModule()
export class CurrentLocationModule {
  static withMap(config: { locationsMap: LocationMap }): ModuleWithProviders<CurrentLocationModule> {
    return {
      ngModule: CurrentLocationModule,
      providers: [
        {
          provide: LOCATIONS_MAP,
          useValue: config.locationsMap
        }
      ]
    };
  }
}
