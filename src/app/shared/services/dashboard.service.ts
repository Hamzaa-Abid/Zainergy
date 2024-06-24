import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  public getDevices(data) {
    return this.http.post(`${environment.baseUrl}/custom/zainergy/getDevices`, data)
  }

  public getDevicesOnDuration(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=getDevices`, data)
  }

  public getDivicesByAccount(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=getDevicesByAccount`, data)
  }

  public getLatestStat(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=getLatestStatsByDevice`, data)
  }

  public getLineChartByAccount(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=getLineChartByAccount`, data)
  }

  public getLatestStatsByDevice(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=getLatestStatsByDevice`, data)
  }
  
  public getDeviceCategories(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=getDeviceCategories`, data)
  }

  public getDeviceStatus(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=getDeviceStatus`, data)
  }

  public getParamGraph(data){
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=getParamGraphs`, data)
  }

  public getProfile() {
    return this.http.get(`${environment.baseUrl}/users/me`)
  }

  public postProfile(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=updateUserDeatil`, data)
  }

  public httpPost(data) {
    return this.http.post(`${environment.baseUrl}/custom/directory/zainergy`, data)
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}