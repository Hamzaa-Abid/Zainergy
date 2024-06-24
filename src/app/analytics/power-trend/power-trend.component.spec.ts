import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerTrendComponent } from './power-trend.component';

describe('PowerTrendComponent', () => {
  let component: PowerTrendComponent;
  let fixture: ComponentFixture<PowerTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
