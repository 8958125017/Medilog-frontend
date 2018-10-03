import { LabsModule } from './labs.module';

describe('LabsModule', () => {
  let labsModule: LabsModule;

  beforeEach(() => {
    labsModule = new LabsModule();
  });

  it('should create an instance', () => {
    expect(labsModule).toBeTruthy();
  });
});
