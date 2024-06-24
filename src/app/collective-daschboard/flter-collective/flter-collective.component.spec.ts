import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlterCollectiveComponent } from './flter-collective.component';

describe('FlterCollectiveComponent', () => {
  let component: FlterCollectiveComponent;
  let fixture: ComponentFixture<FlterCollectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlterCollectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlterCollectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
