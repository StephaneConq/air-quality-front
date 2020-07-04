import { TestBed } from '@angular/core/testing';

import { AirvisualService } from './airvisual.service';

describe('AirvisualService', () => {
  let service: AirvisualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirvisualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
