import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { GoogleMapsModule } from '@angular/google-maps'
// import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { WidgetsModule } from '../widgets/widgets.module';
// import { EnergyConsumptionComponent } from './energy-consumption/energy-consumption.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { MinMaxComponent } from './min-max/min-max.component';
import { PowerTrendComponent } from './power-trend/power-trend.component';
import { ShareConsumptionComponent } from './share-consumption/share-consumption.component';

@NgModule({
  declarations: [/* EnergyConsumptionComponent, */ HeatMapComponent, MinMaxComponent, PowerTrendComponent, ShareConsumptionComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    GoogleMapsModule,
    // ChartsModule,
    FormsModule,
    NgbModule,
    ScrollingModule,
    WidgetsModule
  ],
  exports: [
    
  ]
})

export class AnalyticsModule { }
