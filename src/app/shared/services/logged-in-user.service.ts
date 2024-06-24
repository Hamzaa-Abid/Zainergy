import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {
  private userSource = new BehaviorSubject({});
  selectedUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: object) {
    this.userSource.next(user)
  }
}
