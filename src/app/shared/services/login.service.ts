import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { LoggedInUserService } from './logged-in-user.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  id: any
  isLoginSubject = new BehaviorSubject({});
  selectedUser = this.isLoginSubject.asObservable();
  private _user: any;
  observer: Observable<any>;

  constructor(private http: HttpClient, private router: Router, private loggedInUser: LoggedInUserService) { }

  public login(loginObj) {
    return this.http.post(`${environment.baseUrl}/auth/authenticate`, loginObj).pipe(map((res: any) => {
      let token = res.data.token;
      this._user = res.data;      
      this.getUserAccount();
      this.loggedInUser.changeUser(this._user);
      localStorage.setItem('token', token);      
      return res
    }))
  }

  //Observabe to get logged in user details throuhout web
  getUser() {
    if(this._user) {
      return this.observer = new Observable<any>((subscriber) => {
          subscriber.next(this._user);
      });
    } else {
      return this.http.get(`${environment.baseUrl}/users/me`)
    }
  }

  getUserAccount() {
    
    let user_id = this._user.user.id;

    let body = {
      action: 'getAccountsByUser',
      user_id: user_id
    };
        
    this.http.post(`${environment.baseUrl}/custom/directory/zainergy`, body).subscribe((res: any) => {
      if( res.data?.[user_id] ) {
        // this._user.user.account = res.data[user_id][0].id;
        localStorage.setItem('account', res.data[user_id][0].id);
        localStorage.setItem('user', user_id);
        
        this.router.navigate(['/dashboard/single']).then(() => {
          window.location.reload();
        });

      }
    })

  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  // to get logged in user token from local storage
  public getToken(): string {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('account')
    this.router.navigate(['/login'])
  }
}
