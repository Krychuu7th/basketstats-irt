import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { StandardMatch } from '../models/match.models';
import { matchResolver } from './match.resolver';

describe('matchResolver', () => {
  const executeResolver: ResolveFn<StandardMatch> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => matchResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
