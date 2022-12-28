import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { RoleGuardDataModel } from 'src/app/models/role-guard.model';
import { RolesService } from 'src/app/services/roles.service';

/**
 * This class is a route guard. When a user navigates to a given URL, the
 * guard gets called into action to allow navigation to this route, or not.
 * This guard acts like this:
 * On entering the route, the guard verifies that the user has the required roles
 * If it has the roles, it allows passing.
 * If he does not have the roles, he will redirect to one of the following in order:
 *
 * 1) The fallback route provided in the route data
 *
 * 2) The initial navigation URL
 *
 */
@Injectable()
export class RoleGuard implements CanLoad, CanActivate {

  constructor(private readonly router: Router,
              private readonly rolesService: RolesService) {
  }

  private computeIsAllowed(controlRoles: string | string[]): boolean {
    if (typeof controlRoles === 'string') {
      return this.rolesService.isUserInRole(controlRoles);
    } else if (Array.isArray(controlRoles)) {
      return this.rolesService.isUserInAnyRole(controlRoles);
    } else {
      throw new Error('Invalid roles provided');
    }
  }

  private tryFallback(fallbackRoute: string | undefined): UrlTree {
    if (typeof fallbackRoute === 'string') {
      return this.router.createUrlTree([fallbackRoute]);
    }
    return this.router.createUrlTree([this.router.url]);
  }

  canLoad(
    route: Route,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const guardData = route.data?.['roleGuardData'] as RoleGuardDataModel;
    const isAllowed = this.computeIsAllowed(guardData?.requiredRoles);
      console.log('=====isAllowed====', isAllowed);
    return isAllowed || this.tryFallback(guardData.fallbackRoute);

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const guardData = route.data?.['roleGuardData'] as RoleGuardDataModel;
    const isAllowed = this.computeIsAllowed(guardData.requiredRoles);

    return isAllowed || this.tryFallback(guardData.fallbackRoute);
  }

}
