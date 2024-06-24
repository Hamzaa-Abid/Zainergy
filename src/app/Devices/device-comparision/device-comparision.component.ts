import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { enFilter } from 'src/app/shared/constant';

@Component({
  selector: 'app-device-comparision',
  templateUrl: './device-comparision.component.html',
  styleUrls: ['./device-comparision.component.scss']
})


export class DeviceComparisionComponent implements OnInit {
  user_id: any;
  deviceArray: any = [];
  graphParam: any;
  graphData: any;
  labelData: any;
  filterArray: any;
  itemList = [];
  selectedItems : any = [];
  settings = {};
  background: ThemePalette = undefined;
  singleSelectionSettings: { };
  selectedDuration: any;
  durationArray: any[];
  filteredItems :Array<object> = []
  enabled: boolean = false;
  settings2: { };
  deviceType
  filteredDevices: Array<object> = [];

  constructor(public deviceService: DashboardService, public loginService: LoginService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    //get logged in user to get assigned devices
    this.loginService.getUser().subscribe((res: any) => {
      if (res.user) {
        this.user_id = res.user.id
      }
      else {
        this.user_id = res.data.id
      }
      this.devicesConected();
    })

    this.selectedItems = [];
    this.settings = {
      singleSelection: false,
      text: "Select Devices",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      searchPlaceholderText: 'Search Devices',
      enableSearchFilter: true,
      badgeShowLimit: 2,
      // groupBy: "category"
    };

    this.settings2 = {
      singleSelection: true,
      text: "Select Devices",
      enableSearchFilter: true,
      searchPlaceholderText: 'Search Duration',
      badgeShowLimit: 1,
    };


    this.singleSelectionSettings = {
      singleSelection: true,
      text: "Select Duration",
      enableSearchFilter: true,
      searchPlaceholderText: 'Search Duration',
      badgeShowLimit: 1,
    };

    this.durationArray = [
      {"id":1,"itemName":enFilter.last15min},
      {"id":2,"itemName":enFilter.last20mins},
      {"id":3,"itemName":enFilter.last30min},
      {"id":4,"itemName":enFilter.last24hours},
      {"id":5,"itemName":enFilter.today},
      {"id":6,"itemName":enFilter.week},
      {"id":7,"itemName":enFilter.last30days},
      {"id":8,"itemName":enFilter.last90days},
      {"id":8,"itemName":enFilter.year},
    ]
  }

  // lineChart
  // tslint:disable-next-line:max-line-length
  public lineChartData: Array<any> = [{ data: [0,0,0,0], label: '' }];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Array<any> = [
    {
      borderColor: '#009efb',
      pointBackgroundColor: '#009efb',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#009efb'
    },
    {
      borderColor: '#55ce63',
      pointBackgroundColor: '#55ce63',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#55ce63'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


  getSimilarDevices(){
    this.selectedItems = []
    let deviceType  = this.deviceType[0].itemName
    this.filteredDevices = []
    this.deviceArray.map((item)=>{
      if(item.device_type == deviceType){
        this.filteredDevices.push({ "id": item.id, "itemName": item.itemName  , "parameters": item.parameters})
      }
    })
  }

  //on radio button change assign it to respective selected device
  onChange(mrChange: MatRadioChange,index?) {
    this.selectedItems.forEach((i)=>{
      i.selectedParam = mrChange.value;
    })
    if(this.selectedItems.length > 0){
      this.enabled = false
    }
 }

 //get devices assigned to logged in user
  devicesConected() {
    let deviceObj = {
      user_id: this.user_id,
    }
    this.deviceService.getDivicesByAccount(deviceObj).subscribe((res: any) => {
      if (res.status == '200') {
        let count = 1
        Object.keys(res.data).forEach((deviceData) => {
          let data = res.data[deviceData]
          this.deviceArray.push({ "id": data.device_id, "itemName": data.device_name  , "parameters": data.parameters, device_type: data.device_type})

          let deviceTypePresent = this.filteredItems.find((i: any)=>{ return i.itemName == data.device_type})
          if(deviceTypePresent == undefined){
            this.filteredItems.push({"id": count, "itemName": data.device_type })
            count++
          }

        })
      }
    })
  }

  getDevicesSelect(){
    if(this.selectedItems.length > 0){
      if(this.selectedItems[this.selectedItems.length - 1].selectedParam  || this.selectedItems[0].selectedParam){
        if(this.enabled == true){
          this.selectedItems.forEach((selectedParam)=>{
            selectedParam.selectedParam = ''
          })
        }
        else{
          let paramSeleted = this.selectedItems[0].selectedParam
          this.selectedItems.forEach((selectedParam)=>{
            selectedParam.selectedParam = paramSeleted
        })
        this.enabled = false
        }
      }
    }
    else{
      this.enabled = true
    }

  }


  // submit to get line chart data for devices
  submit() {
    this.lineChartData = [];
    this.lineChartLabels = [];
    let objParams = {
      "user_id": [this.user_id],
      "device_id": [],
      "duration": this.selectedDuration[0].itemName,
      "parameters":[this.selectedItems[0].selectedParam]
    };
    this.selectedItems.forEach((i)=>{
      objParams.device_id.push(i.id)
    })
    

    this.deviceService.getLineChartByAccount(objParams).subscribe((res: any) => {
      if (res.status == '200') {
        let data = []
        this.graphData = res.data
        if (this.graphData.buckets) {
          if (this.graphData.buckets.length > 0) {
            this.graphData.buckets.forEach((deivce,index) => {
              deivce.date_agg.buckets.map((average) => {
                Object.keys(average).forEach((param)=>{
                  if(param.toLowerCase().includes('avg') && param.toLowerCase().includes(objParams.parameters[0])){
                    let graphValue : any = average[param].value
                data.push(graphValue)
                  }
                })
              })
              //populates data in line chart
              this.lineChartData.push({ data: data, label: 'Device ID: ' + deivce.key, ...this.lineChartColors[index]})
              data = [];
            })
            // format dates showed on graph horizontally
            this.graphData.buckets[0].date_agg.buckets.map((labels) => { this.lineChartLabels.push(labels.key_as_string.replace(/Z|T/g, ' ').substring(11,16)) })
          }
        }
      }
    })
  }

}
