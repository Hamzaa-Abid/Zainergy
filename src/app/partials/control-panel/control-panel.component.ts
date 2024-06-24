import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { EmitterService } from 'src/app/shared/services/event-service';

@Component({
  selector: 'zainergy-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private eventEmitter: EmitterService) { }

  public user: any;
  public device_hierarchy: any;
  public device_id: any;

  public selected_device: any;
  public location: string = 'N/A';
  public category: any = 'N/A';
  public type: string = 'N/A';
  public id: string = 'N/A';
  public show_panel: boolean = true;

  ngOnInit(): void {

    this.deviceLocationHierarchy();

    this.eventEmitter.listen('selectedDevice', (device_id) => {
      this.device_id = device_id;
      this.selectedDevice();
    });

    this.eventEmitter.listen('menuFromPanelControl', (status) => {
      this.show_panel = !status;
      console.log(this.show_panel);
    });

  }

  /* getUser() {
    this.authService.getUser().subscribe((res: any) => {      
      if (res?.data || res?.user) {
        this.user = (res.data) ? res.data: res.user;

        this.deviceLocationHierarchy();
      }
    })
  } */

  deviceLocationHierarchy() {

    let data = {
      'action': 'getDeviceLocationHierarchy',
      'account_id': localStorage.getItem('account')
    }

    this.dashboardService.httpPost(data).subscribe((res: any) => {

      if (res.data) {
        this.device_hierarchy = res.data;
        this.firstDeviceID(res.data[0]);
      }

    })
  }

  /** get first device ID from nested array */
  firstDeviceID(data) {
    
    if (data.childrens) {
      this.firstDeviceID(data.childrens[0])
    } else {
      this.device_id = data.id;
      this.eventEmitter.emit('selectedDevice', this.device_id);
    }

  }

  selectedDevice() {
    this.eventEmitter.emit('getSelectedSingleDevice', this.device_id);
    this.getSelectedDeviceInfo();
  }

  getSelectedDeviceInfo() {

    let body = {
      'action': 'getDeviceByID',
      'device_id': [this.device_id]
    }

    this.dashboardService.httpPost(body).subscribe((res: any) => {

      if (res.status === 200 && res.data[this.device_id]) {

        let device_info = res.data[this.device_id];

        this.location = device_info.location;
        this.category = (device_info.device_category == '2') ? 'Meter' : 'Sensor';
        this.type = device_info.device_type.toUpperCase();
        this.id = device_info.device_id;

      }

    })

  }

}
