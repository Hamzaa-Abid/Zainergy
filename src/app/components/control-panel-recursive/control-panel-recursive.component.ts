import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zainergy-control-panel-recursive',
  templateUrl: './control-panel-recursive.component.html',
  styleUrls: ['./control-panel-recursive.component.scss']
})
export class ControlPanelRecursiveComponent implements OnInit {
  
  constructor() { }

  @Output("selectedDevice") selectedDevice: EventEmitter<any> = new EventEmitter();
  @Input() device_hierarchy: any;

  ngOnInit(): void {
    this.selectedDevice.emit();
  }
  
}
