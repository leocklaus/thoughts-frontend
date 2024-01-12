import { TestBed } from '@angular/core/testing';

import { ThoughtServiceService } from './thought-service.service';

describe('ThoughtServiceService', () => {
  let service: ThoughtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThoughtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
