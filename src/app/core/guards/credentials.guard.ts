import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CredentialsChecker } from './credentials-checker.model';
import { CREDENTIALS_CHECKER } from './injection-tokens';
import { CredentialsGuardModel } from './credentials.model';

/**
 * This class is a route guard. When a user navigates to a given URL, the
 * guard gets called into action to allow navigation to this route, or not.
 * This guard acts like this:
 * On entering the route, the guard verifies that the user has the required credentials
 * This validator requires that his routes be given an object named credentialGuardData containing the fields
 * ```
 * {
 *   credentialsGuardData: {
 *      canLoadInverseResult: boolean
 *      canDeactivateInverseResult: boolean
 *   }
 * }
 *
 * ```
 *
 * This field decides if the credential response is inverse or not.
 * @example
 *  If the user credentials are ok, you do not want him to be able to go to the login page
 *  without logging out, so you reverse the credentials on the canDeactivate method
 *
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsGuard implements CanLoad, CanDeactivate<unknown> {

  private readonly defaultGuardData: CredentialsGuardModel = {
    canLoad: {
      inverse: false,
    },
    canDeactivate: {
      inverse: false
    }
  };

  private sanitizeGuardData(receivedGuardData: Partial<CredentialsGuardModel> | undefined): CredentialsGuardModel {
    return {
      canLoad: {
        inverse: receivedGuardData?.canLoad?.inverse ?? this.defaultGuardData.canLoad.inverse,
        redirectTo: receivedGuardData?.canLoad?.redirectTo
      },
      canDeactivate: {
        inverse: receivedGuardData?.canDeactivate?.inverse ?? this.defaultGuardData.canDeactivate.inverse,
        redirectTo: receivedGuardData?.canDeactivate?.redirectTo
      }
    };
  }

  constructor(@Inject(CREDENTIALS_CHECKER) private readonly credentialsChecker: CredentialsChecker,
              private readonly router: Router) {
  }

  private tryRedirect(redirectTo: string | undefined): UrlTree {
    if (typeof redirectTo === 'string') {
      return this.router.createUrlTree([redirectTo]);
    }
    return this.router.createUrlTree([this.router.url]);
  }

  private checkCredentials(routeData: CredentialsGuardModel, key: keyof CredentialsGuardModel): Observable<boolean | UrlTree> {
    let inverseResult: boolean | undefined;

    if (routeData) {
      inverseResult = routeData[key].inverse ?? false;
    }

    return this.credentialsChecker.checkCredentials()
      .pipe(
        map(checkValue => {
          return inverseResult ? !checkValue : checkValue}),
        catchError(err => {
          console.log(err);
          return of(false);
        }),
        map(x => x === true ? x : this.tryRedirect(routeData[key].redirectTo))
      )
      ;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentState: RouterStateSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeData = this.sanitizeGuardData(currentRoute.data['credentialsGuardData']);
    console.log('result canDeactivate', this.checkCredentials(routeData, 'canDeactivate'));
    return this.checkCredentials(routeData, 'canDeactivate');

  }

  canLoad(
    route: Route,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeData = this.sanitizeGuardData(route.data?.['credentialsGuardData']);
    return this.checkCredentials(routeData, 'canLoad');
  }

}
