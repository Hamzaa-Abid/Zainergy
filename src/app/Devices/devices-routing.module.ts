import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { DevicesModule } from './devices.module';
import { DeviceComparisionComponent } from './device-comparision/device-comparision.component';


const routes: Routes = [
  {path: '', component: DevicesComponent},
  {path: 'compare-devices', component: DeviceComparisionComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
