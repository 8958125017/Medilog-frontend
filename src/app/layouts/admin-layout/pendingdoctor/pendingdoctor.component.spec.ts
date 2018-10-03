import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingdoctorComponent } from './pendingdoctor.component';

describe('PendingdoctorComponent', () => {
  let component: PendingdoctorComponent;
  let fixture: ComponentFixture<PendingdoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingdoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
