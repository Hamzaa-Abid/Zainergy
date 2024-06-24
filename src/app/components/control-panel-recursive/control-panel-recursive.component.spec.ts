import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelRecursiveComponent } from './control-panel-recursive.component';

describe('ControlPanelRecursiveComponent', () => {
  let component: ControlPanelRecursiveComponent;
  let fixture: ComponentFixture<ControlPanelRecursiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelRecursiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlPanelRecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
