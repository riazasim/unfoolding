import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import { DeaAdminDashboardDataModel, DeaUserDashboardDataModel } from '../models/dea-admin-dashboard-data.model';
import { GenericApiService } from './generic-api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DeaDashboardService {
  private API_URL=environment.API_URL;
  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>,
    private readonly httpClient:HttpClient) {
  }

  // public getAdminDashboardData(): Observable<DeaAdminDashboardDataModel> {
  //   return this.apiClient.getOne('default', 'admin/dashboard');
  // }
  // public getAdminDashboardData(id:number): Observable<any> {
  //   return this.httpClient.get<any>(this.API_URL+'api/sub-user-usages/'+id);
  // }
  public getUserDashboardData(id:number): Observable<DeaUserDashboardDataModel> {
    return this.httpClient.get<any>(this.API_URL+'api/dashboard/'+id);
  }
  // public getUserDashboardData(): Observable<DeaUserDashboardDataModel> {
  //   return this.apiClient
  //     .getOne<Array<any>>('default', 'dashboard')
  //     .pipe(
  //       map(x => x.pop())
  //     );
  // }

}
