import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpatientComponent } from './pendingpatient.component';

describe('PendingpatientComponent', () => {
  let component: PendingpatientComponent;
  let fixture: ComponentFixture<PendingpatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingpatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
