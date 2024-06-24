import { Component, OnInit, Output, EventEmitter, ɵConsole } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../shared/services/dashboard.service";
import { LoginService } from "../shared/services/login.service";
import { SharedService } from "../shared/services/shared.service";
import { NgbCalendar, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { EmitterService } from "../shared/services/event-service";
import { DataSharedService } from "../shared/services/data-shared.service";
import { enFilter } from '../shared/constant';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-indivicual-devices',
  templateUrl: './indivicual-devices.component.html',
  styleUrls: ['./indivicual-devices.component.scss']
})
export class IndivicualDevicesComponent implements OnInit {


  name: any
  user_id: any;
  device_id: any;
  showComponent: boolean = false
  deviceService: number;
  getlabel: string = enFilter.today;


  deviceArray: any = [];
  paramDetail: any = [];
  // @Output() sendingParamDetail :EventEmitter<any>= new EventEmitter();
  // @Output() sendingUser_id :EventEmitter<any>= new EventEmitter();
  // @Output() sendingdeviceDetail :EventEmitter<any>= new EventEmitter();
  graphParam: any = [];


  deviceDetail: any = [];
  deviceInfo: unknown[];
  tankData: any = [];
  showGraph: boolean = false;
  toDate: any;
  fromDate: any;
  lineGraphArray: Array<object> = [];
  barGraphData: any = [];
  showBarGraph = false
  gaugeLabel = [];
  showWaterTank: boolean = false;
  deviceStatus = [];
  latestStats: any;

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService,
    private loginService: LoginService, private dateService: SharedService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private dataSharedService: DataSharedService, private eventEmitter: EmitterService) {

  }




  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.device_id = params.params.deviceID;

      // this.dataSharedService.device_id = this.device_id;
      //get login user details
      this.getUser();
      // real time data after every 7 seconds
      this.eventEmitter.listen('getGraphData', () => {
        this.getLineGraph();
      })
      this.deviceService = + setInterval(() => {
        //get realtime stats
        this.getLatestStats()
      }, 7000);
    })
  };

  getGraphObj() {

    let paramArray = []
    this.paramDetail.forEach((param) => {
      if(param.param_status == true){
        paramArray.push(param.parameter)
      }
    })
    let obj = {}
    this.getlabel = this.dataSharedService.getlabel
    if (this.getlabel == enFilter.selectFilter) {
      obj = {
        "user_id": [`${this.user_id}`],
        "device_id": [`${this.device_id}`],
        "parameters": paramArray,
        "range": {
          "from": `${this.dataSharedService.fromDate.year}-${('0' + this.dataSharedService.fromDate.month).slice(-2)}-${('0' + this.dataSharedService.fromDate.day).slice(-2)}`,
          "to": `${this.dataSharedService.toDate.year}-${('0' + this.dataSharedService.toDate.month).slice(-2)}-${('0' + this.dataSharedService.toDate.day).slice(-2)}`
        },
      }

    }
    else {
      this.toDate = null
      this.fromDate = null
      if (this.getlabel == undefined) {
        this.getlabel = enFilter.today
      }
      obj =
      {
        "user_id": [`${this.user_id}`],
        "device_id": [`${this.device_id}`],
        "duration": this.getlabel,
        "parameters": paramArray,
      }
    }
    return obj
  }

  getLineGraph() {
    this.showGraph = false
    this.lineGraphArray = []
    // get graph object
    let graphObj = this.getGraphObj()

    this.dashboardService.getLineChartByAccount(graphObj).subscribe((res: any) => {
      if (res.data.buckets && res.data.buckets.length > 0) {
        this.lineGraphArray = res.data.buckets
      }
      this.showGraph = true
      
    })
  }

  getDeviceStatus(){
    let obj ={
      "user_id": this.dataSharedService.user_id,
      "device_id": [this.device_id]
    }
    this.dashboardService.getDeviceStatus(obj).subscribe((res:any)=>{
      if(res.data.length > 0){
        this.deviceStatus = Object.values(res.data[0])
      }
    })

  }

  getUser() {
    this.loginService.getUser().subscribe((res: any) => {
      if (res.user) {
        this.user_id = res.user.id
      }
      else {
        this.user_id = res.data.id

      }
      this.dataSharedService.user_id = this.user_id
      this.getDeviceStatus()
      // get device name
      this.getDeviceName()
    })
  };


  getDeviceName() {
    let data = {
      user_id: this.user_id
    }
    this.dataSharedService.paramDetail = []
    this.dashboardService.getDivicesByAccount(data).subscribe((res: any) => {
      if (res.status == '200') {
        Object.keys(res.data).forEach((deviceData) => {
          this.deviceArray.push(res.data[deviceData])
        })
        this.deviceArray.forEach((device) => {
          if (device.device_id == this.device_id) {
            this.paramDetail = device.parameters
            this.paramDetail.forEach((param) => {
              if(param.param_status == true){
                this.graphParam.push({ max: `max_${param.parameter}`, min: `min_${param.parameter}`, avg: `avg_${param.parameter}` })
                this.dataSharedService.paramDetail.push(param)
              }

            })
            this.dataSharedService.graphParam = this.graphParam
    
    
            this.getLineGraph()
            this.getLatestStats()
            this.deviceDetail = device;
            this.dataSharedService.deviceDetail = this.deviceDetail
            this.showComponent = true;
            // this.getSensorData()
          }
        })

      }
    })
  }

  getLatestStats() {
    this.showBarGraph = false
    let obj = {}

    // get graph object
    let paramArray = []
    this.paramDetail.forEach((param) => {
      paramArray.push(param.parameter)
    })
    obj = {
      "user_id": [`${this.user_id}`],
      "device_id": this.device_id,
      "parameters": paramArray,
    }

    this.dashboardService.getLatestStatsByDevice(obj).subscribe((res: any) => {
      this.gaugeLabel = []
  
        delete res.data.timestamp;
        this.deviceInfo = Object.values(res.data);
        this.latestStats = res.data
    

      //   //Noor
        if (this.deviceDetail.device_type == "level") {
          this.tankData = res.data
          this.showWaterTank = true
        }
      // }
    })
  }

  // stop api call after component change
  ngOnDestroy() {
    if (this.deviceService) {
      clearInterval(this.deviceService);
    }
  }



}