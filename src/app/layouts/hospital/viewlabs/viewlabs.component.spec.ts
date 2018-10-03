import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlabsComponent } from './viewlabs.component';

describe('ViewlabsComponent', () => {
  let component: ViewlabsComponent;
  let fixture: ComponentFixture<ViewlabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
