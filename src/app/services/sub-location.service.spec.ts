import { TestBed } from '@angular/core/testing';

import { SubLocationService } from './sub-location.service';

describe('SubLocationService', () => {
  let service: SubLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
