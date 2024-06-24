import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructor() { }

  public convertDate(date) {
    let newDte = new Date(date);
    let options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    let timeString = date.toLocaleString('en-US', options);
    return `${timeString} `

  }
}
