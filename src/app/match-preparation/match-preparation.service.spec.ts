import { TestBed } from '@angular/core/testing';

import { MatchPreparationService } from './match-preparation.service';

describe('MatchPreparationService', () => {
  let service: MatchPreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchPreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
