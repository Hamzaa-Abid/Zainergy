import { Component, OnInit, ViewChild, Input, OnChanges } from "@angular/core";
import { DashboardService } from "../../shared/services/dashboard.service";
import { DataSharedService } from "../../shared/services/data-shared.service";

@Component({
    selector: 'app-indivicual-card',
    templateUrl: 'indivicual-card.component.html',
    styleUrls: ['../indivicual-devices.component.scss']

  })
  export class IndivicualCardComponent implements OnInit,OnChanges {

    user_id;
    deviceDetail: any = [];
    paramDetail: any = [];
    tankData: any = [];
    scrollHroizontal = true
    scrollVertical = false

    // @Input() paramDetail;
    // @Input() user_id;
    // @Input() deviceDetail;
    @Input() data;

    deviceInfo: any = [];

    constructor(private dashboardService: DashboardService, private dataSharedService: DataSharedService)
        {}

    ngOnInit(){
      this.user_id = this.dataSharedService.user_id;
      this.paramDetail = this.dataSharedService.paramDetail;
      this.deviceDetail = this.dataSharedService.deviceDetail;


        // this.getDeviceName();
    }

    ngOnChanges(){
      this.deviceInfo = this.data;
    }


  }