import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalSidebarComponent } from './hospitalsidebar.component';

describe('HospitalSidebarComponent', () => {
  let component: HospitalSidebarComponent;
  let fixture: ComponentFixture<HospitalSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
