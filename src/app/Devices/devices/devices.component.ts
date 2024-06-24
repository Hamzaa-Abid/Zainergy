import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { LoginService } from 'src/app/shared/services/login.service';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  getlabel: any

  user_id: any;
  deviceArray: any = []


  showGraph: boolean = false;

  device_categories: any = []
  deviceSelected: any = 'All'
  keyArray: any = []
  deviceArrayCpy = []

  showCard: boolean = false;
  sensorData: any = [];
  deviceCategories: any = [];
  deviceId: string[];
  deviceFilter=[];
  selectedSimilarDevice : string

  constructor(public deviceService: DashboardService, public loginService: LoginService) {}

  ngOnInit(): void {
    this.getUserID()
  }

  getUserID() {
    this.loginService.getUser().subscribe((res: any) => {
      if (res.user) {
        this.user_id = res.user.id
      } else {
        this.user_id = res.data.id
      }
      this.getSensorData()
    })
  }  



  getDeviceStatus(){
      let obj ={
        "user_id": this.user_id,
      }
      this.deviceService.getDeviceStatus(obj).subscribe((res:any)=>{
        this.deviceArray.forEach((device)=>{
          res.data.forEach((id)=>{
            if(Object.keys(id)[0] == device.device_id){
              device.isActive = Object.values(id)[0]
            }
        })
      })
      })
    

  }

  getSimilarDevice(){
    if(this.selectedSimilarDevice.toLocaleLowerCase() == 'all'){
      if(this.deviceSelected.toLocaleLowerCase() == 'all'){
        this.deviceArray = this.deviceArrayCpy
      }
      else{
        this.deviceArray = this.deviceArrayCpy.filter((device)=>{
          return this.deviceSelected == device.device_category
        }) 
      }

    }
    else{
      this.deviceArray = this.deviceArrayCpy.filter((device)=>{
        return this.selectedSimilarDevice == device.device_type
      })    
    }
  }

  getSensorData() {
    let obj = {
      "user_id": `${this.user_id}`
    }
    this.deviceService.getDeviceCategories(obj).subscribe((res: any) => {
      this.sensorData = res.data
      this.sensorData.forEach(( category ) => {
        this.device_categories.push(category)
      })
    })
    this.devicesConected()
  }

  getSelectedDevice() {
    this.deviceFilter = []
    if (this.deviceSelected.toLowerCase() == 'all') {
      this.deviceArrayCpy.forEach((data)=>{
        let devicePresent = this.deviceFilter.find((i)=>{
          return i == data.device_type
        })
        if(devicePresent == undefined){
          this.deviceFilter.push(data.device_type)
        }
      })
      this.deviceArray = this.deviceArrayCpy
      this.selectedSimilarDevice = 'All'
      this.getSimilarDevice()
    } else {
      this.deviceArrayCpy.forEach((data) => {            
        if ( data.device_category == this.deviceSelected ) {
          let devicePresent = this.deviceFilter.find((i)=>{
            return i == data.device_type
          })
          if(devicePresent == undefined){
            this.deviceFilter.push(data.device_type)
          }
        }
      })
      this.selectedSimilarDevice = 'All'
      this.getSimilarDevice()
    }    
    
  }

  devicesConected() {
    let deviceObj = {
      user_id: this.user_id,
    }
    this.deviceService.getDivicesByAccount(deviceObj).subscribe((res: any) => {
      if (res.status == '200') {
      

        Object.keys(res.data).forEach((deviceData) => {
          this.deviceArray.push(res.data[deviceData])
        })
        
        this.deviceArrayCpy = this.deviceArray
        this.getSelectedDevice()
        this.getDeviceStatus()
        this.showCard = true
      }
    })
  }

}
