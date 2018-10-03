import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOldRecordComponent } from './add-old-record.component';

describe('AddOldRecordComponent', () => {
  let component: AddOldRecordComponent;
  let fixture: ComponentFixture<AddOldRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOldRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOldRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
