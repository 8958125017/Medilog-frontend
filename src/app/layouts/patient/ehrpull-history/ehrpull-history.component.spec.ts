import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EHRPullHistoryComponent } from './ehrpull-history.component';

describe('EHRPullHistoryComponent', () => {
  let component: EHRPullHistoryComponent;
  let fixture: ComponentFixture<EHRPullHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EHRPullHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EHRPullHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
