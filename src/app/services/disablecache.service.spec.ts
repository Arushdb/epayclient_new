import { TestBed } from '@angular/core/testing';

import { DisablecacheService } from './disablecache.service';

describe('DisablecacheService', () => {
  let service: DisablecacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisablecacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
