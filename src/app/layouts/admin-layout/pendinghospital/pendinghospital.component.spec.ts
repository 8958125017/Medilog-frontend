import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendinghospitalComponent } from './pendinghospital.component';

describe('PendinghospitalComponent', () => {
  let component: PendinghospitalComponent;
  let fixture: ComponentFixture<PendinghospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendinghospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendinghospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
