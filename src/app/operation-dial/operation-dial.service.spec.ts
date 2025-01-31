import { TestBed } from '@angular/core/testing';

import { OperationDialService } from './operation-dial.service';

describe('OperationDialService', () => {
  let service: OperationDialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationDialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
