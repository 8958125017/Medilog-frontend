import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySidebarComponent } from './pharmacysidebar.component';

describe('PharmacySidebarComponent', () => {
  let component: PharmacySidebarComponent;
  let fixture: ComponentFixture<PharmacySidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
