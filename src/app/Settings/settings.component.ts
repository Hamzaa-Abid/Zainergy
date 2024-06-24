import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { MixinService } from 'src/app/shared/services/mixin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  deviceArray: any = [];
  user_id: any;
  settingParamsArr: any = [];

  constructor(private settingService: DashboardService, private loginService: LoginService, private mixinService: MixinService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.getUser()
  }

  getUser() {
    this.loginService.getUser().subscribe((res: any) => {
      if (res.user) {
        this.user_id = res.user.id
      } else {
        this.user_id = res.data.id
      }
      this.getDevices()
    })
  }

  getDevices() {
    let data = {
      user_id: this.user_id
    }
    this.settingService.getDivicesByAccount(data).subscribe((res: any) => {

      if(res.status == '200') {
        Object.keys(res.data).forEach(( device ) => {          
          let deviceObj = {
            id: res.data[device].id,
            device_id: res.data[device].device_id,
            name: res.data[device].device_name,
            location: res.data[device].location,
            parameters: res.data[device].parameters
          }
          this.deviceArray.push(deviceObj)

        })
      }
      
    })
  }

  /** update params status */
  deviceParamCheckbox( event, param ) {
    param.param_status = event.target.checked;    
  }

  /** update settings */
  updateSettings( device, parameters ) {    
    let parameter_ids = [];
    let paramStatus = false
    parameters.forEach(( param ) => {
      let parameter = { 
        device_type: param.device_type_id,
        status: (param.param_status) ? 1 : 0
      }
      parameter_ids.push(parameter);
      if(param.param_status == true)  {
        paramStatus = true 
      }
    })
    
    let body = {
      device_id: device.id,
      parameter_ids: parameter_ids
    }        

    if(paramStatus){
      this.mixinService.updateDeviceParams(body).subscribe((res: any) => {      
        if(res.status == '200') {
          this.toastr.success('Settings updated!', `${device.name}`);
        }      
      })
    }
    else{
      this.toastr.error('Select atleast one param', `${device.name}`);
    }
  }

}
