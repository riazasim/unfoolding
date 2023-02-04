import { InjectionToken, Injector } from '@angular/core';
import { DeaApiNamespaces } from '../models/api.type';

export const API_ROOT = new InjectionToken<string>('The api root segment usually /api');
export const API_NAMESPACE = new InjectionToken<DeaApiNamespaces>('A token with api namespaces, the first segments that come after the root');
const injector = Injector.create({providers: [{provide: API_NAMESPACE, useValue: 'http://localhost'}]});
