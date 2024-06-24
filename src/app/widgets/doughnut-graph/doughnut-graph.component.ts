import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
// import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss']
})
export class DoughnutGraphComponent implements OnInit {
  // @Input() doughnutData : MultiDataSet
  // @Input() doughnutChartLabels : Label[]

  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

}
