import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnergyGraphComponent } from './energy-graph-component/energy-graph.component';
import {DhtGraphComponent} from './dht-graph-component/dht-graph-component'
import {WaterTankComponent} from './water-tank/water-tank.component'
// import { GaugeModule } from 'angular-gauge';
// import { ChartsModule } from 'ng2-charts';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { GaugeGraphComponent } from './gauge-graph/gauge-graph.component';
import { DoughnutGraphComponent } from './doughnut-graph/doughnut-graph.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [    
    EnergyGraphComponent,
    DhtGraphComponent,
    WaterTankComponent,
    BarGraphComponent,
    GaugeGraphComponent,
    DoughnutGraphComponent,
    LineGraphComponent],
  imports: [
    CommonModule,
    // GaugeModule,
    // ChartsModule,
    NgbModule,
    FormsModule


  ],
  exports: [
    EnergyGraphComponent,
    DhtGraphComponent,
    WaterTankComponent,
    BarGraphComponent,
    GaugeGraphComponent,
    DoughnutGraphComponent,
    LineGraphComponent
  ]
})
export class WidgetsModule { }
