import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-water-tank',
  templateUrl: './water-tank.component.html',
  styleUrls: ['./water-tank.component.scss']
})
export class WaterTankComponent implements OnInit, OnChanges {

  @Input() data: any;
  constructor() {
    this.updateScale(10)
   }

  public barChartOptions: any = {};

  public barChartLabels: string[] = ['volume'];
  public barChartType = 'bar';
  public barChartLegend = true;

  // tslint:disable-next-line:max-line-length
  public barChartData: any[] = [{ data: [0], label: 'Water volume' },{ data: [0], label: 'Refill'} ];
  public barChartColors: Array<any> = [{ backgroundColor: '#009efb' },{backgroundColor: 'grey'}];


    // events
    public chartClicked(e: any): void {
    }
  
    public chartHovered(e: any): void {
    }
  
    public randomize(): void {
      // Only Change 3 values
      const data = [Math.round(Math.random() * 100), 59, 80, Math.random() * 100, 56, Math.random() * 100, 40];
      const clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
      /**
       * (My guess), for Angular to recognize the change in the dataset
       * it has to change the dataset variable directly,
       * so one way around it, is to clone the data, change it and then
       * assign it;
       */
    }

  ngOnInit(): void {
  }

  updateScale(tcap) {
    this.barChartOptions = {
      scaleShowVerticalLines: true,
      responsive: true,
      barThickness: 30,
      scales: {
        xAxes:[{
          stacked: true,
          barPercentage: 1,
          categoryPercentage: 1
        }],
        yAxes:[{
          gridLines:{
            display : false
          },
            display: true,
            stacked: true,
            ticks: {
                min: 0, // minimum value
                max: Math.round(tcap) // maximum value
            }
        }]
    }
    };
}

  ngOnChanges(changes: SimpleChanges) {
    // this.updateScale(this.data.tcap)
    if(changes.data.currentValue?.fvol !== changes.data.previousValue?.fvol){
      this.updateScale(this.data.tcap)
      this.barChartData[0].data = [this.data.fvol]
      this.barChartData[0].label = 'Water volume: '+this.data.fvol
      this.barChartData[1].data = [this.data.ref]
      this.barChartData[1].label = 'Refill Water:' +  this.data.ref 
      // this.barChartData= [{ data: [this.data.fvol], label: }];
    }
  }

}
