import { TestBed } from '@angular/core/testing';

import { LandMarkService } from './land-mark.service';

describe('LandMarkService', () => {
  let service: LandMarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandMarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
