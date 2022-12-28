import { InjectionToken } from '@angular/core';
import { LocationMap } from './location-map.type';

export const LOCATIONS_MAP = new InjectionToken<LocationMap>('The locations map for the CurrentLocationService');
