import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollectiveDaschboardComponent} from './collective-daschboard/collective-daschboard.component'


const routes: Routes = [
  { path: '', component: CollectiveDaschboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectiveDaschboardRoutingModule { }
