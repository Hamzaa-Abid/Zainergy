import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class DataSharedService {

public user_id: number;
public deviceDetail: any = [];
public paramDetail: any = [];
public deviceArray: any = []
public device_id: any;
public getlabel: string;
public category: string
fromDate: any;
toDate: any;
graphParam: any = [];





  constructor() { }
}
