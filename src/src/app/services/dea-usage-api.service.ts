import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class DeaUsageApiService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  public getUsageList(): Observable<any> {
    return this.apiClient.getArray('default', 'sub-user-usages');
  }

  public exportUserUsage(): Observable<any> {
    return this.apiClient.get('default','sub-user-usages/export-csv');
  }

}
