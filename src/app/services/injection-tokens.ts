import { InjectionToken } from '@angular/core';

export const API_ROOT = new InjectionToken<string>('The api root segment usually /api');
export const API_NAMESPACE = new InjectionToken<{ [key: string]: string }>('A token with api namespaces, the first segments that come after the root');
