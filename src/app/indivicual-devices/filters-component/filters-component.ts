import { Component, OnInit, Output, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../../shared/services/dashboard.service";
import { LoginService } from "../../shared/services/login.service";
import { SharedService } from "../../shared/services/shared.service";
import { NgbCalendar, NgbDateParserFormatter, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { enFilter } from "../../shared/constant";
import { DataSharedService } from "../../shared/services/data-shared.service";
import { EmitterService } from "../../shared/services/event-service";


@Component({
  selector: 'app-filters',
  templateUrl: 'filters-component.html',
  styleUrls: ['../indivicual-devices.component.scss']
})

export class FiltersComponent implements OnInit {

  @Input() status : any
  deviceName: any;
  user_id: any;

  // deviceArray: any = [];
  paramDetail: any = [];
  // deviceDetail: any = [];
  // graphParam: any = [];
  // deviceType: any = [];
  filters: any = ['last 15 mins', 'last 30 mins', 'last 24 hours', 'today', 'week', 'last 30 days', 'last 90 days', 'year'];
  getlabel: string = enFilter.today;
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  deviceType: any = [];
  device_id: any;

  data: string;
  deviceStatus = [];
  showCard: boolean = false;
  sensorData: any;

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


  getSensorData() {
    let obj = {
      "user_id": `${this.dataSharedService.user_id}`
    }    
    this.dashboardService.getDeviceCategories(obj).subscribe((res: any) => {
      this.sensorData = res.data
      this.sensorData.forEach((sensor) => {
        if (sensor.id == this.paramDetail.device_type) {
          this.deviceType = sensor
          // get latest stats
          //   this.getLatestStats()
          // plot line graph from filter
          //   this.getLineGraph()
        }
      })

    })
  }

}