import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import { DeaAdminDashboardDataModel, DeaUserDashboardDataModel } from '../models/dea-admin-dashboard-data.model';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class DeaDashboardService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  public getAdminDashboardData(): Observable<DeaAdminDashboardDataModel> {
    return this.apiClient.getOne('default', 'admin/dashboard');
  }

  public getUserDashboardData(): Observable<DeaUserDashboardDataModel> {
    return this.apiClient
      .getOne<Array<any>>('default', 'dashboard')
      .pipe(
        map(x => x.pop())
      );
  }

}
