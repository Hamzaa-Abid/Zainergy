import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeComponent } from './comparative.component';

describe('ComparativeComponent', () => {
  let component: ComparativeComponent;
  let fixture: ComponentFixture<ComparativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
