import { AfterViewInit, Component, OnInit } from "@angular/core";
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { DataSharedService } from 'src/app/shared/services/data-shared.service';
import { EmitterService } from 'src/app/shared/services/event-service';
import { LoginService } from 'src/app/shared/services/login.service';
import { enFilter } from '../../shared/constant'
@Component({
  selector: 'app-collective-daschboard',
  templateUrl: './collective-daschboard.component.html',
  styleUrls: ['./collective-daschboard.component.scss']
})
export class CollectiveDaschboardComponent implements OnInit {
  user_id: number;
  deviceStatus = [];
  deviceArray = [];
  device_type = "energy"
  getlabel: string = enFilter.today;
  showUser: boolean = false;
  lineChartArray: any = [];
  graphParam: any = [];

  constructor(private loginService: LoginService, private dataSharedService: DataSharedService, private dashboardService: DashboardService, private eventEmitter: EmitterService) { }

  ngOnInit(): void {
    this.getUser()
    
    this.eventEmitter.listen('getGraphData', () => {
      debugger
      this.dataSharedService.graphParam = []
      if(this.dataSharedService.paramDetail.length > 0){
        this.lineChartArray = []
        this.getParams()
        this.getLineChart()
        
      }
    })
  }

  getParams(){
    this.graphParam = []
    this.dataSharedService.paramDetail.forEach((param)=>{
      if(param.param_status == true){
        this.graphParam.push({ max: `max_${param.parameter}`, min: `min_${param.parameter}`, avg: `avg_${param.parameter}` })
      }
    })
  }


  getUser() {
    this.loginService.getUser().subscribe((res: any) => {
      if (res.user) {
        this.user_id = res.user.id
        this.dataSharedService.user_id = this.user_id
        this.showUser = true
      }
      else {
        this.user_id = res.data.id
        this.dataSharedService.user_id = this.user_id
        this.showUser = true
      }
    })
  };

  getLineChart() {
    let deviceName = []
    let paramArray = []
    this.dataSharedService.paramDetail.forEach((device) => {
      let isDevicePResent = deviceName.find((i) => {
        return i == device.device_id
      })
      if (isDevicePResent == undefined) {
        deviceName.push(device.device_id)
      }
      let isParamPresent = paramArray.find((j) => {
        return j == device.parameter
      })
      if (isParamPresent == undefined) {
        paramArray.push(device.parameter)
      }
    })
    let obj
    if (this.dataSharedService.getlabel != enFilter.selectFilter) {
      obj = { user_id: [this.user_id], device_id: deviceName, duration: this.dataSharedService.getlabel, parameters: paramArray }
      this.getDashboards(obj)
    }
    else {
      obj = {
        user_id: [this.user_id], device_id: deviceName, range: {from:`${this.dataSharedService.fromDate.year}-${('0' + this.dataSharedService.fromDate.month).slice(-2)}-${('0' + this.dataSharedService.fromDate.day).slice(-2)}`,to: `${this.dataSharedService.toDate.year}-${('0' + this.dataSharedService.toDate.month).slice(-2)}-${('0' + this.dataSharedService.toDate.day).slice(-2)}`}, parameters: paramArray
      }
      this.getDashboards(obj) 
    }
  }

  getDashboards(obj){
    this.dashboardService.getLineChartByAccount(obj).subscribe((res: any)=>{
      if (res.data.buckets && res.data.buckets.length > 0) {
        res.data.buckets.forEach((i)=>{
          if(this.lineChartArray.length <= 4){
            this.lineChartArray.push(i)
          }
        })
        // this.lineGraphArray = res.data.buckets
      }

    })

  }


}
