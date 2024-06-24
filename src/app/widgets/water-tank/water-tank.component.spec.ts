import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterTankComponent } from './water-tank.component';

describe('WaterTankComponent', () => {
  let component: WaterTankComponent;
  let fixture: ComponentFixture<WaterTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
