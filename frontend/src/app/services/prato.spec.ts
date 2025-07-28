import { TestBed } from '@angular/core/testing';

import { Prato } from './prato';

describe('Prato', () => {
  let service: Prato;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Prato);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
