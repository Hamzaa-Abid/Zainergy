import { Component, OnInit, Input } from '@angular/core';
import { DataSharedService } from '../../shared/services/data-shared.service';
import { DashboardService } from "../../shared/services/dashboard.service";
import { EmitterService } from 'src/app/shared/services/event-service';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements OnInit {
  @Input() barGraph: any
  @Input() labels: any
  deviceService: number;
  paramDetail: any = [];
  deviceDetail: any = [];
  graphData: any = [];


  user_id: any;
  device_id: any;

  lineChartLegend = true;
  labelData: any = [];


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{
      
    }], yAxes: [{
      ticks: {
        min : 0
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartColors: Array<any> = [
  ];


  graphParam: any = [];
  sensorData: any;
  current: any;
  power: any;
  showGraph: boolean = false;

  constructor(private dataSharedService: DataSharedService, private dashboardService: DashboardService, private eventEmitter: EmitterService) { }

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  ngOnInit(): void {
    this.paramDetail = this.dataSharedService.paramDetail;
    this.user_id = this.dataSharedService.user_id;
    this.device_id = this.dataSharedService.deviceDetail.device_id;
    this.getBarGraph();
  }

  getBarGraph() {
    this.barChartColors = []
    console.log(this.barGraph)
    this.labelData =  this.barGraph
    this.labels
    this.showGraph = true
    this.getBarColors()

  }
  getBarColors(){
    this.barChartColors= [{ 
      borderColor:'#FF7A96',
      backgroundColor:'#EAC3CC'
     },{
      borderColor:'#4BB7FF',
      backgroundColor:'#CDEBFF'
     },{
      borderColor:'#FFD36C',
      backgroundColor:'#FFF3D6'
     }]
  }

}
