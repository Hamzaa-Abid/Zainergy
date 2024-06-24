import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-graph',
  templateUrl: './gauge-graph.component.html',
  styleUrls: ['./gauge-graph.component.scss']
})
export class GaugeGraphComponent implements OnInit {
  @Input() gaugeData: any

  constructor() { }

  ngOnInit(): void {
    this.getLabel(this.gaugeData.data)
  }

  getLabel(data){
    return ''+data
  }

}
