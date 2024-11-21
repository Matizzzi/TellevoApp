import { TestBed } from '@angular/core/testing';

import { ManejoviajeService } from './manejoviaje.service';

describe('ManejoviajeService', () => {
  let service: ManejoviajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoviajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
