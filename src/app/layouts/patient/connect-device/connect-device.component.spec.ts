import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectDeviceComponent } from './connect-device.component';

describe('ConnectDeviceComponent', () => {
  let component: ConnectDeviceComponent;
  let fixture: ComponentFixture<ConnectDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
