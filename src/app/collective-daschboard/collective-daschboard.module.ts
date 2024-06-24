import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectiveDaschboardRoutingModule } from './collective-daschboard-routing.module';
import { CollectiveDaschboardComponent } from './collective-daschboard/collective-daschboard.component';
import { FlterCollectiveComponent } from './flter-collective/flter-collective.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [CollectiveDaschboardComponent, FlterCollectiveComponent],
  imports: [
    CommonModule,
    CollectiveDaschboardRoutingModule,
    FormsModule,
    NgbModule,
    WidgetsModule
  ]
})
export class CollectiveDaschboardModule { }
