import { TestBed } from '@angular/core/testing';

import { EmailCheckerAsyncService } from './email-checker-async.service';

describe('EmailCheckerAsyncService', () => {
  let service: EmailCheckerAsyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailCheckerAsyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
