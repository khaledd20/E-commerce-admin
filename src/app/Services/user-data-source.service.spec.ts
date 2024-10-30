import { TestBed } from '@angular/core/testing';

import { UserDataSourceService } from './user-data-source.service';

describe('UserDataSourceService', () => {
  let service: UserDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
