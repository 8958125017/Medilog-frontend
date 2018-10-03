import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeEHRComponent } from './see-ehr.component';

describe('SeeEHRComponent', () => {
  let component: SeeEHRComponent;
  let fixture: ComponentFixture<SeeEHRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeEHRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeEHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
