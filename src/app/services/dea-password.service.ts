import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import type {
  DeaUserFirstPasswordModel,
  DeaUserForgotPasswordModel,
  DeaUserResetPasswordModel
} from '../models/password.models';
import { GenericApiService } from './generic-api.service';


@Injectable({
  providedIn: 'root'
})
export class DeaPasswordService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  /**
   * I know it returns something, but the returned
   * payload is of no consequence, so we ignore it.
   * What this method does is to send a request to the server
   * to send an email
   * @param payload
   */
  // public requestResetPasswordToken(payload: DeaUserForgotPasswordModel): Observable<void> {
  //   return this.apiClient.postJSONWrappedData('security', 'forgot-password', payload);
  // }
  forGot(data: any): Observable<any> {
    return this.apiClient.forGot(data)
  }
  /**
   * I know it return something, but the returned
   * payload is of no consequence, so we ignore it.
   * What this method does is to send an actual reset password
   * request to the server and use the token in the url for identification
   * @param payload
   */
  resetPassword(data: any): Observable<any> {
    return this.apiClient.forGot(data)
  }
  // public resetPassword(payload: DeaUserResetPasswordModel): Observable<void> {
  //   const url = `reset-password${location.search}`;
  //   return this.apiClient.postJSONWrappedData('security', url, payload);
  // }

  /**
   * I know it return something, but the returned
   * payload is of no consequence, so we ignore it.
   * What this method does is to send a request to
   * the server to set the first password and use
   * the token in the url for identification
   * @param payload
   */
  setFirstPassword(data: any): Observable<any> {
    return this.apiClient.forGot(data)
  }
  // public setFirstPassword(payload: DeaUserFirstPasswordModel): Observable<void> {
  //   const url = `verify-user-email?${location.search}`;
  //   return this.apiClient.postJSONWrappedData('security', url, payload);
  // }

}
