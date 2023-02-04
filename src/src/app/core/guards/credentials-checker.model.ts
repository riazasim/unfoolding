import { Observable } from 'rxjs';

export interface CredentialsChecker {
  checkCredentials(): Observable<boolean>;
}
