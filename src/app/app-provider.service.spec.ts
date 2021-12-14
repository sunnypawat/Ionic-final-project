import { TestBed } from '@angular/core/testing';

import { AppProviderService } from './app-provider.service';

describe('AppProviderService', () => {
  let service: AppProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
