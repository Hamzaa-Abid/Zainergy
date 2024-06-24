import { Component, OnInit, Input } from "@angular/core";
import { DashboardService } from "../../shared/services/dashboard.service";
import { DataSharedService } from "../../shared/services/data-shared.service";
import { enFilter, enPdf } from "../../shared/constant";
import { EmitterService } from "../../shared/services/event-service";

// import { Color } from 'ng2-charts';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-dht-graph',
  templateUrl: 'dht-graph-component.html',
  styleUrls: ['dht-graph-component.scss']

})

export class DhtGraphComponent implements OnInit {
@Input() lineGraph: any
@Input() stats: any
@Input() params
  showGraph: boolean = false;
  lineChartData = []
  filterArray = []
  graphData: any = [];
  labelData: any = [];
  paramDetail: any = [];
  user_id: any;
  fromDate: any;
  toDate: any;
  doc: jsPDF;
  device_id: any
  lineExpand: boolean = false;
  csvArray: any = [];
  getlabel= [] ;
  graphAvailible: any;
  barGraphData: Array<object> = [];
  showBar: boolean = false;

  constructor(private dashboardService: DashboardService, private dataSharedService: DataSharedService,
    private eventEmitter: EmitterService) { }

  ngOnInit() {
    this.paramDetail = this.dataSharedService.paramDetail;
    for(let i=0;i<=this.paramDetail.length - 1;i++){
      if(this.paramDetail[i].param_status == false){
        this.paramDetail.splice(this.paramDetail.indexOf(this.paramDetail[0]),1)
      }
    }
    this.getParamGraph(this.paramDetail)
    this.user_id = this.dataSharedService.user_id;
    this.device_id = this.dataSharedService.deviceDetail.device_id;
    debugger
    if(this.dataSharedService.graphParam.length == 0 && this.dataSharedService.paramDetail.length > 0){
      this.dataSharedService.graphParam = this.params
      this.lineGraph = [this.lineGraph]
      this.getLineGraph();
      this.dataSharedService.graphParam = []
    }
    else{
      this.getLineGraph();
    }
  }




  getParamGraph(param){
    let arrPram = []
    param.forEach((param)=>{
      arrPram.push(param.device_type_id)
    })
    let obj = {
      device_type_id: arrPram
    }
    this.dashboardService.getParamGraph(obj).subscribe((response: any)=>{
      this.graphAvailible = response
      let count = 0

      this.paramDetail.forEach((data)=>{
        Object.keys(response.data).forEach((param:any)=>{
            if(data.device_type_id == param){
              data.graph = response.data[param]
            }
        })
          this.getlabel.push(param[count].graph[0].id)
          count++
      })
    })
  }

  getGraphDetails(params,count){
    let temp = params.graph[0]
    let currrGraph = params.graph.find((graph)=> {return graph.id == this.getlabel[count]} )
    params.graph[params.graph.indexOf(currrGraph)] = temp
    params.graph[0] = currrGraph
  }

  getGraphData() {
    let element = { data: [] }
    this.dataSharedService.graphParam.forEach((param) => {
      this.lineGraph[0].date_agg.buckets.forEach((data) => {
        element.data.push(data.key_as_string.substring(11, 16))
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
        { data: [], label: 'min', pointRadius: 1  },
        { data: [], label: 'max', pointRadius: 1  },
        { data: [], label: 'avg', pointRadius: 1 }
      ]
    })
    this.showGraph = true
  }

  getLineGraph() {
    this.labelData = []
    this.filterArray = []
    this.lineChartData = []
    // get graph object

      this.labelData = [
        { data: [], label: 'min', pointRadius: 1,  },
        { data: [], label: 'max', pointRadius: 1, },
        { data: [], label: 'avg', pointRadius: 1,  }
      ]
      if(this.lineGraph.length > 0){
        this.getGraphData()
      }
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
      element['time'] = this.filterArray[0].data[i]
      element['min'] = data[0].data[i]
      element['max'] = data[1].data[i]
      element['avg'] = data[2].data[i]
      this.csvArray.push(element)
      element = {}
    }
  }

  //generate csv
  generateCSV(data) {
    if (data != undefined) {
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


  downloadPDF(device_id, data, event) {
    if (data != undefined) {

      this.csvArray = []
      this.getExportData(data)

      // pdf export and print with graph
      this.generatePdfTable(device_id, event)
    }
  }


  generatePdfTable(device_id, event) {
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
    this.generatePrintPdf(device_id, event)
  }



  generatePrintPdf(device_id, event) {
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
