import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlabsComponent } from './addlabs.component';

describe('AddlabsComponent', () => {
  let component: AddlabsComponent;
  let fixture: ComponentFixture<AddlabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
