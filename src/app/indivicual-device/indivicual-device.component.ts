import { Component, OnInit } from '@angular/core';
// import { Color } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../shared/services/dashboard.service';
import { LoginService } from '../shared/services/login.service';
import { enFilter, enPdf } from '../shared/constant'
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas'
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared/services/shared.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-indivicual-device',
  templateUrl: './indivicual-device.component.html',
  styleUrls: ['./indivicual-device.component.scss']
})

export class IndivicualDeviceComponent implements OnInit {

  deviceService: number;
  graphData: any = [];
  lineExpand: boolean = false;
  device_id: any
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  filters: any = ['last 15 mins', 'last 30 mins', 'last 24 hours', 'today', 'week', 'last 30 days', 'last 90 days', 'year']
  filterArray = []
  getlabel: string = enFilter.today;
  deviceName: any;
  deviceArray: any = [];
  paramDetail: any = [];
  deviceDetail: any = [];
  deviceType: any = []
  deviceInfo: any = [];
  user_id: any;
  lineChartLegend = true;
  lineChartData = []
  labelData: any = [];
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        // stacked: true,
        ticks: {
          fontColor: 'black',
        }
      }],
      yAxes: [{
        // stacked: true,
        ticks: {
          fontColor: 'black',
        },
        scaleLabel: {
          display: true,
          fontColor: 'black',
        }

      }],
    },
    legend: {
      position: 'bottom',
      display: true,

      labels: {
        fontColor: 'black',
      },
    }
  };
  /* lineChartColors: Color[] = [
    {
      // grey
      borderColor: '#D32929',
      pointBackgroundColor: '#D32929',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#009efb'
    },
    {
      // dark grey
      borderColor: '#1C3FAA',
      pointBackgroundColor: '#1C3FAA',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#55ce63'
    },
    {
      // dark grey
      borderColor: '#FBC500',
      pointBackgroundColor: '#FBC500',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#55ce63',
    },
  ]; */
  showGraph = false

  graphParam: any = [];
  doc: jsPDF;
  csvArray: any = [];
  sensorData: any;
  tankData: any = [];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private loginService: LoginService, private dateService: SharedService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) { }

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

    if (this.toDate != null) {
      this.getlabel = enFilter.selectFilter
      // plot graph between date range
      this.getLineGraph()
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.device_id = params.params.deviceID
      //get login user details
      this.getUser()

      // real time data after every 7 seconds
      this.deviceService = + setInterval(() => {
        //get realtime stats
        this.getLatestStats()
      }, 7000);
    })
  }

  // stop api call after component change
  ngOnDestroy() {
    if (this.deviceService) {
      clearInterval(this.deviceService);
    }
  }

  getLatestStats() {
    let paramArray = []
    this.paramDetail.forEach((param) => {
      paramArray.push(param.parameter)
    })
    let obj = {
      "user_id": this.user_id,
      "device_id": this.deviceDetail.device_id,
      "parameters": paramArray,
    }
    this.dashboardService.getLatestStatsByDevice(obj).subscribe((res: any) => {
      this.deviceInfo = Object.values(res.data);

      //Noor
      if(this.deviceDetail.device_type = "level"){
        this.tankData = res.data
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
      // get device name
      this.getDeviceName()
    })
  }

  getSensorData() {
    let obj = {
      "user_id": `${this.user_id}`
    }
    this.dashboardService.getDeviceCategories(obj).subscribe((res:any)=>{
      this.sensorData = res.data
      this.sensorData.forEach((sensor) => {
        if (sensor.id == this.deviceDetail.device_type) {
          this.deviceType = sensor
          // get latest stats
          this.getLatestStats()
          // plot line graph from filter
          this.getLineGraph()
        }
      })

    })
  }

  getDeviceName() {
    let data = {
      user_id: this.user_id
    }

    this.dashboardService.getDivicesByAccount(data).subscribe((res: any) => {      
      if (res.status == '200') {
        Object.keys(res.data).forEach((deviceData) => {
          this.deviceArray.push(res.data[deviceData])
        })
        this.deviceArray.forEach((device) => {
          if (device.device_id == this.device_id) {
            this.paramDetail = device.parameters
            this.paramDetail.forEach((param) => {
              this.graphParam.push({ max: `max_${param.parameter}`, min: `min_${param.parameter}`, avg: `avg_${param.parameter}` })
            })
            this.deviceDetail = device
            this.getSensorData()
          }
        })
      }
    })
  }

  getGraphObj() {
    let paramArray = []
    this.paramDetail.forEach((param) => {
      paramArray.push(param.parameter)
    })
    let obj = {}
    if (this.getlabel == enFilter.selectFilter) {
      obj = {
        "user_id": [`${this.user_id}`],
        // "device_id": this.deviceDetail.device_id,
        "parameters": paramArray,
        "range": {
          "from": `${this.fromDate.year}-${('0' + this.fromDate.month).slice(-2)}-${('0' + this.fromDate.day).slice(-2)}`,
          "to": `${this.toDate.year}-${('0' + this.toDate.month).slice(-2)}-${('0' + this.toDate.day).slice(-2)}`
        },
      }

    }
    else {
      this.toDate = null
      this.fromDate = null
      obj =
      {
        "user_id": [`${this.user_id}`],
        // "device_id": this.deviceDetail.device_id,
        "duration": this.getlabel,
        "parameters": paramArray,
      }
    }
    return obj
  }

  getLineGraph() {
    this.showGraph = false
    this.filterArray = []
    this.lineChartData = []
    // get graph object
    let graphObj = this.getGraphObj()
    this.dashboardService.getLineChartByAccount(graphObj).subscribe((res: any) => {      
      this.graphData = res.data
      this.labelData = [
        { data: [], label: 'min', pointRadius: 1, fill: false },
        { data: [], label: 'max', pointRadius: 1, fill: false },
        { data: [], label: 'avg', pointRadius: 1, fill: false }
      ]
      if (this.graphData.buckets) {
        if (this.graphData.buckets.length > 0) {
          // filter graph data
          this.getGraphData()

          this.showGraph = true
        }
        else {
          this.paramDetail.forEach((i) => {
            this.lineChartData.push(this.labelData)
          })
          this.showGraph = true
        }
      }
    })
  }

  getGraphData() {
    let element = { data: [] }
    this.graphParam.forEach((param) => {
      this.graphData.buckets[0].date_agg.buckets.forEach((data) => {
        element.data.push(data.key_as_string.substring(0, 10) + '' + data.key_as_string.substring(11, 16))
        let count = 0
        Object.keys(data).forEach((i) => {
          if (Object.keys(data)[count] == param.min) {
            let value: any = Object.values(data)[count]
            this.labelData[0].data.push(value.value)
          }
          if (Object.keys(data)[count] == param.max) {
            let value: any = Object.values(data)[count]
            this.labelData[1].data.push(value.value)
          }
          if (Object.keys(data)[count] == param.avg) {
            let value: any = Object.values(data)[count]
            this.labelData[2].data.push(value.value)
          }
          count++
        })
      })
      this.filterArray.push(element)
      element = {
        data: []
      }
      this.lineChartData.push(this.labelData)
      this.labelData = [
        { data: [], label: 'min', pointRadius: 1, fill: false },
        { data: [], label: 'max', pointRadius: 1, fill: false },
        { data: [], label: 'avg', pointRadius: 1, fill: false }
      ]
    })
  }

  // view graph fullScreen
  fullScreen(id, classType?) {
    let element = document.getElementById(id)
    var classes = element.className;
    if (this.lineExpand == false) {
      element.className = classes + " " + 'fullscreen'
      this.lineExpand = true
    }
    else {
      element.className = " "

      element.className = 'col-lg-6 col-xl-6'
      this.lineExpand = false
    }
  }

  getExportData(data) {
    this.csvArray = []
    let element = {}
    for (let i = 0; i < data[0].data.length; i++) {
      element['date'] = this.filterArray[0].data[i]
      element['min'] = data[0].data[i]
      element['max'] = data[1].data[i]
      element['avg'] = data[2].data[i]
      this.csvArray.push(element)
      element = {}
    }
  }

  //generate csv
  generateCSV(data) {
    if(data != undefined){
      this.getExportData(data)
      const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
      const header = Object.keys(this.csvArray[0]);
      let csv = this.csvArray.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
      csv.unshift(header.join(','));
      let cvArray = csv.join('\r\n');
      var blob = new Blob([cvArray], { type: 'text/csv' })
      saveAs(blob, `${this.device_id}.csv`);
    }
  }

  downloadPDF(device_id, data,event) {
    if(data != undefined){

    this.csvArray = []
    this.getExportData(data)

      // pdf export and print with graph
      this.generatePdfTable(device_id,event)
    }
  }

  generatePdfTable(device_id,event) {
    const header = Object.keys(this.csvArray[0]);
    let body = {}
    let csv = []

    this.csvArray.map((i) => {
      csv.push(Object.values(i))

    })
    let graphHeader = []
    graphHeader.push(header)
    this.doc = new jsPDF();
    this.doc.setFontSize(18);
    this.doc.text(`${this.device_id}`, 11, 8);
    this.doc.setFontSize(11);
    this.doc.setTextColor(100);

    (this.doc as any).autoTable({
      head: graphHeader,
      body: csv,
      theme: 'striped',

    })
    // generate graph on pdf
    this.generatePrintPdf(device_id,event)
  }

  generatePrintPdf(device_id,event) {
    let finalY = (this.doc as any).lastAutoTable.finalY;
    let data = document.getElementById(`${device_id}`)

    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 195;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pageHeight = this.doc.internal.pageSize.height;

      let spaceLeft = pageHeight - finalY
      if (spaceLeft < imgHeight) {
        this.doc.addPage()
        finalY = 0
      }
      this.doc.addImage(contentDataURL, 'PNG', 15, finalY + 3, imgWidth, imgHeight)

      if (event.target.name == enPdf.print) {
        // print option
        this.doc.autoPrint();  // <<--------------------- !!
        window.open(this.doc.output('bloburl'), '_blank');
      }
      else {
        // pdf generation
        this.doc.save(`${this.device_id}.pdf`);
      }
    })
  }

}
