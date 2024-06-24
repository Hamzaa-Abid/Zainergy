import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingleComponent } from './single/single.component';
import { CollectiveComponent } from './collective/collective.component';
import { ComparativeComponent } from './comparative/comparative.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'single', component: SingleComponent },
  { path: 'collective', component: CollectiveComponent },
  { path: 'comparative', component: ComparativeComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
