import { Component, OnInit, Output, Input } from "@angular/core";
import { DashboardService } from "../../shared/services/dashboard.service";
import { NgbCalendar, NgbDateParserFormatter, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { enFilter } from "../../shared/constant";
import { DataSharedService } from "../../shared/services/data-shared.service";
import { EmitterService } from "../../shared/services/event-service";

@Component({
  selector: 'app-flter-collective',
  templateUrl: './flter-collective.component.html',
  styleUrls: ['./flter-collective.component.scss']
})
export class FlterCollectiveComponent implements OnInit {

  deviceName: any;
  user_id: any;

  paramDetail: any = [];
  filters: any = ['last 15 mins', 'last 30 mins', 'last 24 hours', 'today', 'week', 'last 30 days', 'last 90 days', 'year'];
  getlabel: string = enFilter.today;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  deviceType: any = [];
  data: string;
  showCard: boolean = false;
  sensorData: any;
  deviceCategories: string = 'All'
  deviceArray = [];
  fileredDevices = [];
  deviceSeleced : string = 'All'
  graphParam = [];
  deviceArrayCpy: any = [];


  constructor(private dashboardService: DashboardService, private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter, private dataSharedService: DataSharedService,
    private eventEmitter: EmitterService) { }

  // select date to and from
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.dataSharedService.toDate = this.toDate;
    this.dataSharedService.fromDate = this.fromDate;
    if (this.toDate != null) {
      this.getlabel = enFilter.selectFilter
      this.dataSharedService.getlabel = this.getlabel;
      // plot graph between date range
      //   this.getLineGraph()
      this.eventEmitter.emit('getGraphData', this);
    }
  }

  // ngbdropdown
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  // ngbdropdown
  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  // ngbdropdown
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  // ngbdropdown
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  ngOnInit() {
    this.paramDetail = this.dataSharedService.paramDetail;
    this.user_id = this.dataSharedService.user_id;
    this.dataSharedService.getlabel = enFilter.today;
    this.getSensorData();
  }

  durationFilter() {
    this.dataSharedService.getlabel = this.getlabel;
    this.eventEmitter.emit('getGraphData', this);
  }


getParams(){
  this.dataSharedService.paramDetail = []
  this.graphParam = []
  let paramArray = []
         this.deviceArray.forEach((device) => {
        device.parameters.forEach((param)=>{

          if(param.param_status == true){
            this.dataSharedService.paramDetail.push(param)  
          }
        })
     })
     this.eventEmitter.emit('getGraphData', this);

}


  getSimilarDevice() {
    this.fileredDevices = []
    if (this.deviceCategories.toLowerCase() == 'all') {
      this.deviceArrayCpy.forEach((data)=>{
        let devicePresent = this.fileredDevices.find((i)=>{
          return i == data.device_type
        })
        if(devicePresent == undefined){
          this.fileredDevices.push(data)
        }
      })
      this.deviceArray = this.deviceArrayCpy
      this.deviceSeleced = 'All'
      this.getDeviceType()
    } else {
      this.deviceArrayCpy.forEach((data) => {            
        if ( data.device_category == this.deviceCategories ) {
            this.fileredDevices.push(data)
        }
      })
      this.deviceSeleced = 'All'
      this.getDeviceType()
    }    
  }

  getDeviceType(){
    if(this.deviceSeleced.toLocaleLowerCase() == 'all'){
      if(this.deviceCategories.toLocaleLowerCase() == 'all'){
        this.deviceArray = this.deviceArrayCpy
        this.getParams()
      }
      else{
        this.deviceArray = this.deviceArrayCpy.filter((device)=>{
          return this.deviceCategories == device.device_category
        }) 
        this.getParams()
      }

    }
    else{
      this.deviceArray = this.deviceArrayCpy.filter((device)=>{
        return this.deviceSeleced == device.id
      })    
      this.getParams()
    }
  }
 
  getSensorData() {
    let obj = {
      "user_id": `${this.dataSharedService.user_id}`
    }    
    this.dashboardService.getDeviceCategories(obj).subscribe((res: any) => {
      this.sensorData = res.data
    this.getDevices()
    })
  }

  getDevices(){
    let obj ={
      "user_id": this.user_id,
    }   
     this.dashboardService.getDivicesByAccount(obj).subscribe((res:any)=>{
       this.deviceArray = Object.values(res.data)
       this.deviceArrayCpy =  this.deviceArray
      this.fileredDevices = this.deviceArrayCpy
       this.dataSharedService.deviceArray = this.fileredDevices       
  })
  
}
}

