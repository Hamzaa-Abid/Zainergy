import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiveDaschboardComponent } from './collective-daschboard.component';

describe('CollectiveDaschboardComponent', () => {
  let component: CollectiveDaschboardComponent;
  let fixture: ComponentFixture<CollectiveDaschboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectiveDaschboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectiveDaschboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
