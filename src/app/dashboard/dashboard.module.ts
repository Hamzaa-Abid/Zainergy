import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GoogleMapsModule } from '@angular/google-maps'
import { DashboardComponent } from './dashboard/dashboard.component'
// import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LineGraphComponent } from '../widgets/line-graph/line-graph.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { SingleComponent } from './single/single.component';
import { CollectiveComponent } from './collective/collective.component';
import { ComparativeComponent } from './comparative/comparative.component';
import { CardsComponent } from '../components/cards/cards.component';

@NgModule({
  declarations: [DashboardComponent, SingleComponent, CollectiveComponent, ComparativeComponent, CardsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GoogleMapsModule,
    // ChartsModule,
    FormsModule,
    NgbModule,
    ScrollingModule,
    WidgetsModule
  ],
  exports: [
    DashboardComponent,
  ]
})

export class DashboardModule { }
