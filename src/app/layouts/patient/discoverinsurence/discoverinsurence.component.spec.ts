import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverinsurenceComponent } from './discoverinsurence.component';

describe('DiscoverinsurenceComponent', () => {
  let component: DiscoverinsurenceComponent;
  let fixture: ComponentFixture<DiscoverinsurenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverinsurenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverinsurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
