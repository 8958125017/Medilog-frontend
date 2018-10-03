import { HospitalModule } from './hospital.module';

describe('HospitalModule', () => {
  let hospitalModule: HospitalModule;

  beforeEach(() => {
    hospitalModule = new HospitalModule();
  });

  it('should create an instance', () => {
    expect(hospitalModule).toBeTruthy();
  });
});
