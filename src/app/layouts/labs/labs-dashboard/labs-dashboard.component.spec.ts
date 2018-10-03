import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsDashboardComponent } from './labs-dashboard.component';

describe('LabsDashboardComponent', () => {
  let component: LabsDashboardComponent;
  let fixture: ComponentFixture<LabsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
