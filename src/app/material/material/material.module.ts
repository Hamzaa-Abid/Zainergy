import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';


const materialComponent = [
  MatButtonModule,
  MatTabsModule,
  MatRadioModule
]

@NgModule({
  imports: [
  ],
  exports: [
    materialComponent
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class MaterialModule { }
