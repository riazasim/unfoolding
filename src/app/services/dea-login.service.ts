import { Injectable, Injector } from '@angular/core';
import type { Observable } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import type { DeaLoginModel, DeaLoginResponseModel } from '../models/login.models';
import { ResponseItemWrapper } from '../models/response-wrappers.types';
import { pluckItemWrapperData } from '../shared/utils/api.functions';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class DeaLoginService {
  apiClient: GenericApiService<DeaApiNamespaces>;
  constructor(
              // private readonly apiClient: GenericApiService<DeaApiNamespaces>,    
              private injector: Injector) {
  }

  public login(payload: DeaLoginModel): Observable<DeaLoginResponseModel> {
    this.apiClient = this.injector.get(GenericApiService<DeaApiNamespaces>)
    return this.apiClient
      .postJSONWrappedData<DeaLoginModel, ResponseItemWrapper<DeaLoginResponseModel>>("apiAuth", 'sign-in', payload)
      .pipe(
        pluckItemWrapperData()
      );
  }

}
