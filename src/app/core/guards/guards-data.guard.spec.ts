import { TestBed } from '@angular/core/testing';

import { GuardsDataGuard } from './guards-data.guard';

describe('GuardsDataGuard', () => {
  let guard: GuardsDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardsDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
