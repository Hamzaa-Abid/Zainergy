import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceComparisionComponent } from './device-comparision.component';

describe('DeviceComparisionComponent', () => {
  let component: DeviceComparisionComponent;
  let fixture: ComponentFixture<DeviceComparisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceComparisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
