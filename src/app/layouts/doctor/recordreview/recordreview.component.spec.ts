import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordreviewComponent } from './recordreview.component';

describe('RecordreviewComponent', () => {
  let component: RecordreviewComponent;
  let fixture: ComponentFixture<RecordreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
