import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareConsumptionComponent } from './share-consumption.component';

describe('ShareConsumptionComponent', () => {
  let component: ShareConsumptionComponent;
  let fixture: ComponentFixture<ShareConsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareConsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
