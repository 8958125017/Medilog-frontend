import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdoctorsComponent } from './searchdoctors.component';

describe('SearchdoctorsComponent', () => {
  let component: SearchdoctorsComponent;
  let fixture: ComponentFixture<SearchdoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchdoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchdoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
