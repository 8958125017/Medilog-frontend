import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprescriptionComponent } from './createprescription.component';

describe('CreateprescriptionComponent', () => {
  let component: CreateprescriptionComponent;
  let fixture: ComponentFixture<CreateprescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateprescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
