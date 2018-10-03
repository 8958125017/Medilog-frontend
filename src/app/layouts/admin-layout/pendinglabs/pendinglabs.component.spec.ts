import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendinglabsComponent } from './pendinglabs.component';

describe('PendinglabsComponent', () => {
  let component: PendinglabsComponent;
  let fixture: ComponentFixture<PendinglabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendinglabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendinglabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
