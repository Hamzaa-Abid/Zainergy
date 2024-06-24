import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service'
import { LoginService } from '../../shared/services/login.service';
import { DataSharedService } from 'src/app/shared/services/data-shared.service';
import * as moment from 'moment';
import { enFilter } from 'src/app/shared/constant';
import { ToastrService } from 'ngx-toastr';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  noOfDevices: number;
  getDevicesDetail: any;
  center = { lat: 24.860966, lng: 66.990501 };
  markerOptions = { draggable: false };
  filterArray = []
  id: any = 'monthly'

  // lineChart
  // tslint:disable-next-line:max-line-length
  public lineChartData: any = [{ data: [], label: '', lineTension: 0.1 }, { data: [], label: '', lineTension: 0.1 }, { data: [], label: '', lineTension: 0.1 }];
  public lineChartLabels: Array<any> = [];

  deviceArray: any = [];
  user_id: any;
  deviceType: any;
  deviceStatus = [];
  alertDevces: number;
  sidebarArray: any = [];
  activeDevices: number;
  showGraph: boolean = false;
  graphTitle: string;
  obj: { user_id: any[]; device_id: any[]; duration: any; parameters: any[]; };
  label: string = enFilter.today;
  sidebarElement: any = {};
  public isMenuCollapsed = true;
  deviceService: number;
  showLabels: boolean = false;
  activeStatus: boolean = true;
  param: any;


  constructor(public dashboardService: DashboardService, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserID()
    this.deviceService = + setInterval(() => {
      //get realtime stats
      this.getDeviceStatus()
    }, 1 * 60 * 1000);
  }

  ngOnDestroy() {
    if (this.deviceService) {
      clearInterval(this.deviceService);
    }
  }
  

  activateClass(params,sidebar){
    let element
    if(this.sidebarElement.param && this.sidebarElement.id){
      element = document.getElementById(`${this.sidebarElement.device}_${this.sidebarElement.param}`)
      element.className = 'treeview__level' 
      element = document.getElementById(`T${this.sidebarElement.id}`)
      element.className = 'treeview__level' 
    }
    this.sidebarElement = {param : sidebar.device_type_id , id: params.id , device: params.device_id}
    element = document.getElementById(`${params.device_id}_${sidebar.device_type_id}`)
    element.className = element.className + " " + "active-sidebar"
    element = document.getElementById(`T${params.id}`)
    element.className = element.className + " " + "active-sidebar"
  }

  viewGraph(event){
    let element = event.target.id
    if(element != this.label){
      this.getLineGraph(this.param,this.graphTitle.split('-')[0],element)
    }
  }

  getLineGraph(param,location,duration?) {
    this.param = param
    if(duration == undefined ){
      this.label = enFilter.today
    }
    else{
      this.label = duration
    }
    if(this.label != undefined && this.label != ''){
      this.obj = {
        user_id: [this.user_id], device_id: [param.device_id], duration: this.label, parameters: [param.parameter]
      }
      this.graphTitle =`${location} - ${param.description}`
      this.showGraph = false
      this.lineChartLabels = []
      this.lineChartData = [{ data: [], label: '', lineTension: 0.1 }, { data: [], label: '', lineTension: 0.1 }, { data: [], label: '', lineTension: 0.1 }];
      this.dashboardService.getLineChartByAccount(this.obj).subscribe((res: any) => {
        if (res.data.buckets && res.data.buckets[0].date_agg) {
          // delete doc_count
          res.data.buckets[0].date_agg.buckets.forEach((data) => {
            delete data.doc_count
            delete data.key
            this.lineChartLabels.push(data.key_as_string.substring(11, 16))
            delete data.key_as_string
            let param: any = Object.values(data)
            this.lineChartData[0].data.push(param[0].value)
            this.lineChartData[1].data.push(param[1].value)
            this.lineChartData[2].data.push(param[2].value)
            this.lineChartData[0].label = Object.keys(data)[0]
            this.lineChartData[1].label = Object.keys(data)[1]
            this.lineChartData[2].label = Object.keys(data)[2]
          })
          this.showGraph = true
  
        }
        else{
          this.toastr.error(`No data found for device`,`${this.graphTitle}`);
        }
      })

    }
  }

  getUserID() {
    this.loginService.getUser().subscribe((res: any) => {
      if (res.user) {
        this.user_id = res.user.id
      }
      else {
        this.user_id = res.data.id
      }
      this.devicesConected(this.user_id)
    })
  }

  getDeviceStatus() {
    this.deviceStatus = []
    let obj = {
      "user_id": this.user_id,
    }
    this.alertDevces = 0
    this.dashboardService.getDeviceStatus(obj).subscribe((res: any) => {
      let statusObject = {}
      let date = moment(new Date(), "HH:mm:ss")
      res.data.forEach((status) => {
        let currentDate = moment(new Date(status.lastReceived.replace('PKT', ' ')), "HH:mm:ss")
        let lastPresent: any = moment.duration(currentDate.diff(date));
        let minute
        if(Math.abs(lastPresent._data.days) > 0){
          minute = `${Math.abs(lastPresent._data.days)} d ${Math.abs(lastPresent._data.hours)} h ${Math.abs(lastPresent._data.minutes)} m `
        }
        else if (Math.abs(lastPresent._data.minutes) < 60 && Math.abs(lastPresent._data.hours) != 0) {
          minute = `${Math.abs(lastPresent._data.hours)} h ${Math.abs(lastPresent._data.minutes)} m ${Math.abs(lastPresent._data.seconds)} s`
        }
        else if (Math.abs(lastPresent._data.minutes) == 60) {
          minute = `${Math.abs(lastPresent._data.hours)} h`
        }
        else if (Math.abs(lastPresent._data.hours) < 60 && Math.abs(lastPresent._data.minutes) == 0) {
          minute = `0 m ${Math.abs(lastPresent._data.seconds)} s`
        }
        else {
          minute = `${Math.abs(lastPresent._data.minutes)} m ${Math.abs(lastPresent._data.seconds)} s`
        }
        statusObject = {
          minutes: minute,
          lastReceived: status.lastReceived,
          status: Object.values(status)[0],
          device: Object.keys(status)[0]
        }
        if (Object.values(status)[0] == false) {
          this.alertDevces += 1
        }
        this.deviceStatus.push(statusObject)
      })
      this.activeDevices = this.deviceStatus.length - this.alertDevces
      if(this.activeStatus === true){
        this.activateClass(this.sidebarArray[0],this.sidebarArray[0].parameters[0])
        this.activeStatus = false
      }
    })
  }

  devicesConected(user_id) {
    let data = {
      user_id: user_id
    }
    this.dashboardService.getDivicesByAccount(data).subscribe((res: any) => {
      if (res.status == 200) {
        this.deviceArray = Object.keys(res.data)
        this.sidebarArray = []
        Object.values(res.data).forEach((i : any)=>{
          i.isCollapsed = true
        })
        this.deviceArray.forEach((device) => {
          this.sidebarArray.push(res.data[device])
        })
        this.getDeviceStatus()
        this.showLabels = true
        this.getLineGraph(this.sidebarArray[0].parameters[0], this.sidebarArray[0].location)

      }
    })
  }

}
