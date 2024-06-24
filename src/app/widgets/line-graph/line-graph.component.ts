import { Component, Input, OnInit } from '@angular/core';
// import { Color } from 'ng2-charts';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {
  @Input() dataYaxis: any
  @Input() dataXaxis: any

  lineChartData = []
  constructor() { }
  lineChartLegend = true;
  lineChartOptions = {
    responsive: true,
    bezierCurve: false,
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          stepSize: 3,
          fontColor: 'black',
        },
        scaleLabel: {
          display: true,
        },
      }],
      yAxes: [{
        // stacked: true,
        ticks: {
          fontColor: 'black',
        },
        
        scaleLabel: {
          display: true,
          fontColor: 'black',
        },

      }],
      tooltips: {
        mode: 'index',
        intersect: false,
      },
     hover: {
        mode: 'nearest',
        intersect: true
      },
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
    
  ]; */

  ngOnInit(): void {
    /* this.lineChartColors = []
    this.getLineColor() */
  }
  /* getLineColor(){
    this.lineChartColors=[{
      // grey
      backgroundColor: 'rgba(0,158,251,0.1)',
      borderColor: '#009efb',
      pointBackgroundColor: '#009efb',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#009efb'
    },
    {
      // dark grey
      backgroundColor: 'rgba(85,206,99,0.1)',
      borderColor: '#55ce63',
      pointBackgroundColor: '#55ce63',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#55ce63'
    }]
  } */

}
