import { TestBed, inject } from '@angular/core/testing';

import { PleaseWaitService } from './please-wait.service';

describe('PleaseWaitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PleaseWaitService]
    });
  });

  it('should be created', inject([PleaseWaitService], (service: PleaseWaitService) => {
    expect(service).toBeTruthy();
  }));
});
