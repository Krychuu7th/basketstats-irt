import { TestBed } from '@angular/core/testing';

import { MatchProcessService } from './match-process.service';

describe('MatchProcessService', () => {
  let service: MatchProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
