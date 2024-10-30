import { TestBed } from '@angular/core/testing';

import { MobilePatternService } from './mobile-pattern.service';

describe('MobilePatternService', () => {
  let service: MobilePatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilePatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
