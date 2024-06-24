import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices/devices.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceComparisionComponent } from './device-comparision/device-comparision.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {MaterialModule} from '.././material/material/material.module'





@NgModule({
  declarations: [DevicesComponent, DeviceComparisionComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    NgbModule,
    // ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    MaterialModule
  ],

})
export class DevicesModule { }
