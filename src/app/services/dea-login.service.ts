import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import type { DeaLoginModel, DeaLoginResponseModel } from '../models/login.models';
import { ResponseItemWrapper } from '../models/response-wrappers.types';
import { pluckItemWrapperData } from '../shared/utils/api.functions';
import { GenericApiService } from './generic-api.service';
import { SuccessResponse } from './status-responses.types';

@Injectable({
  providedIn: 'root'
})
export class DeaLoginService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  // public login(payload: any): Observable<DeaLoginResponseModel> {
  //   return this.apiClient
  //     .postJSONWrappedData<DeaLoginModel, ResponseItemWrapper<DeaLoginResponseModel>>('security', 'login', payload)
  //     .pipe(
  //       pluckItemWrapperData()
  //     );
  // }
  
  signIn(data: any): Observable<any> {
    return this.apiClient.signIn(data)
  }


}
