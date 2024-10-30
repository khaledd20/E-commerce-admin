/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductDataSourceService } from './ProductDataSource.service';

describe('Service: ProductDataSource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDataSourceService]
    });
  });

  it('should ...', inject([ProductDataSourceService], (service: ProductDataSourceService) => {
    expect(service).toBeTruthy();
  }));
});
