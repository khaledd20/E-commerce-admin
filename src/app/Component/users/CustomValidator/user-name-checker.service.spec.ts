import { TestBed } from '@angular/core/testing';

import { UserNameCheckerService } from './user-name-checker.service';

describe('UserNameCheckerService', () => {
  let service: UserNameCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNameCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
