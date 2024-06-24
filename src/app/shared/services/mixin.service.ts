import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class MixinService {

    private messageSource = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();
  
    constructor(private http: HttpClient) { }

    public updateDeviceParams(data) {
        return this.http.post(`${environment.baseUrl}/custom/directory/zainergy?action=updateDeviceParams`, data)
    }

    changeMessage(message: string) {
        this.messageSource.next(message)
    }
}
