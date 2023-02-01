import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isUserInAnyRole, isUserInEveryRole, isUserInRole } from '../core/security/security.functions';

@Injectable({
  providedIn: 'root'
})
export class RolesService<T extends string = string> {

  private readonly rolesSubject = new BehaviorSubject<T[]>([]);

  private readonly userInfoSubject = new BehaviorSubject<T[]>([])

  public setuserInfoSubject(roles: T[]): void {
    this.userInfoSubject.next(roles);
  }

  public getuserInfoSubject(): T[] {
   return this.userInfoSubject.value;
  }

  public setUserRoles(roles: T[]): void {
    this.rolesSubject.next(roles);
  }

  public addUserRoles(roles: T[]): void {
    this.rolesSubject.next([...roles]);
  }
  public addUserRole(role: T): void {
    const oldRole = this.rolesSubject.value;
    this.rolesSubject.next([...oldRole, role]);
  }

  public getUserRoles(): T[] {
    return this.rolesSubject.value;
  }

  public listenToUserRoles(): Observable<T[]> {
    return this.rolesSubject.asObservable();
  }

  public isUserInRole(role: T): boolean {
    return isUserInRole(this.getUserRoles(), role);
  }

  public isUserInAnyRole(roles: T[]): boolean {
    return isUserInAnyRole(this.getUserRoles(), roles);
  }

  public isUserInEveryRole(roles: T[]): boolean {
    return isUserInEveryRole(this.getUserRoles(), roles);
  }

}
