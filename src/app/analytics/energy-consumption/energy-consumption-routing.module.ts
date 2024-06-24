import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleComponent } from './single/single.component';
import { ComparativeComponent } from './comparative/comparative.component';
import { CollectiveComponent } from './collective/collective.component';

const routes: Routes = [
  { path: '' },
  { path: 'single', component: SingleComponent },
  { path: 'collective', component: CollectiveComponent },
  { path: 'comparative', component: ComparativeComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EnergyConsumptionRoutingModule { }
