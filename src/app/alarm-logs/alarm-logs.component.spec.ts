import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmLogsComponent } from './alarm-logs.component';

describe('AlarmLogsComponent', () => {
  let component: AlarmLogsComponent;
  let fixture: ComponentFixture<AlarmLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
