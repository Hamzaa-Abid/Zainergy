import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnergyConsumptionRoutingModule } from './energy-consumption-routing.module';
import { SingleComponent } from './single/single.component';
import { ComparativeComponent } from './comparative/comparative.component';
import { CollectiveComponent } from './collective/collective.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SingleComponent, ComparativeComponent, CollectiveComponent],
  imports: [
    CommonModule,
    EnergyConsumptionRoutingModule,
    NgbModule,
  ],
  exports: [
    
  ]
})

export class EnergyConsumptionModule { }
