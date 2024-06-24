import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { EnergyConsumptionComponent } from './energy-consumption/energy-consumption.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { MinMaxComponent } from './min-max/min-max.component';
import { PowerTrendComponent } from './power-trend/power-trend.component';
import { ShareConsumptionComponent } from './share-consumption/share-consumption.component';
import { AnalyticsModule } from './analytics.module';

const routes: Routes = [
  // { path: 'energy-consumption', component: EnergyConsumptionComponent },
  { path: 'heat-map', component: HeatMapComponent },
  { path: 'min-max', component: MinMaxComponent },
  { path: 'power-trend', component: PowerTrendComponent }, 
  { path: 'share-consumption', component: ShareConsumptionComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AnalyticsRoutingModule { }
