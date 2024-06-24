import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { DashboardService } from "../../shared/services/dashboard.service";
import * as jsPDF from 'jspdf';
import {enPdf} from '../../shared/constant'
import html2canvas from 'html2canvas'
import { DataSharedService } from "../../shared/services/data-shared.service";
@Component({
    selector: 'app-graphs',
    templateUrl: 'graphs-component.html',
  })
  export class GraphsComponent implements OnInit {

paramDetail: any = [];
@Input() graphArray:any
@Input() barGaphData: any
@Input() gauge:any

lineExpand: boolean = false;
filterArray = []
csvArray: any = [];
doc: jsPDF;
device_id: any


lineChartData = []



    constructor(private dashboardService: DashboardService, private dataSharedService: DataSharedService)
        {}



    ngOnInit(){
      this.paramDetail = this.dataSharedService.paramDetail;
      this.device_id = this.dataSharedService.deviceDetail.device_id;
    }



  }