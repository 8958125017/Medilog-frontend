import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpharmacyComponent } from './pendingpharmacy.component';

describe('PendingpharmacyComponent', () => {
  let component: PendingpharmacyComponent;
  let fixture: ComponentFixture<PendingpharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingpharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingpharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
