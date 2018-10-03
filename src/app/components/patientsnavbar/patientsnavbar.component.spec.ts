import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsNavbarComponent } from './patientsnavbar.component';

describe('PatientsNavbarComponent', () => {
  let component: PatientsNavbarComponent;
  let fixture: ComponentFixture<PatientsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
