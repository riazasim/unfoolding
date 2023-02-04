import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import type { DeaRegistrationModel, DeaRegistrationResponseModel } from '../models/registration.models';
import { ResponseItemWrapper } from '../models/response-wrappers.types';
import { pluckItemWrapperData } from '../shared/utils/api.functions';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class DeaRegistrationService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  public register(payload: DeaRegistrationModel): Observable<DeaRegistrationResponseModel> {
    return this.apiClient.postJSONWrappedData<DeaRegistrationModel, ResponseItemWrapper<DeaRegistrationResponseModel>>
    ('api', 'sign-up', payload)
      .pipe(pluckItemWrapperData());
  }

}
