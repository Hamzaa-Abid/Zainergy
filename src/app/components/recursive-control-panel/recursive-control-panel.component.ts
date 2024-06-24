import { Component, OnInit, Input } from '@angular/core';
import { EmitterService } from 'src/app/shared/services/event-service';

@Component({
  selector: 'zainergy-recursive-control-panel',
  template: `
    <ul>
      <li *ngFor="let childrens of device_hierarchy | keyvalue"> 

        <a *ngIf="childrens.value.childrens; else withoutChildrens">
            <i class="link-icon tree-icon" data-feather="chevron-right"></i>
            <span>{{ childrens.value.name }}</span>

            <zainergy-recursive-control-panel *ngIf="childrens.value.childrens" [device_hierarchy]="childrens.value.childrens"></zainergy-recursive-control-panel>

        </a>

        <ng-template #withoutChildrens>
            <a href="javascript:void(0);" (click)="selectedDevice( childrens.value.id )">
                {{ childrens.value.name }}
            </a>
        </ng-template>

      </li>
    </ul>
  `
})

export class RecursiveControlPanelComponent implements OnInit {

  @Input() device_hierarchy;
  
  constructor(private eventEmitter: EmitterService) { }

  ngOnInit(): void {
  }

  selectedDevice(device_id) {
    this.eventEmitter.emit('selectedDevice', device_id);
  }

}
