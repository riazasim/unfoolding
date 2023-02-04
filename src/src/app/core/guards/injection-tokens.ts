import { InjectionToken } from '@angular/core';
import { CredentialsChecker } from './credentials-checker.model';

export const CREDENTIALS_CHECKER = new InjectionToken<CredentialsChecker>('An injection token for the credential checker');
