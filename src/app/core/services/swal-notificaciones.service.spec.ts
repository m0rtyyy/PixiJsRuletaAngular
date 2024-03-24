import { TestBed } from '@angular/core/testing';

import { SwalNotificacionesService } from './swal-notificaciones.service';

describe('SwalNotificacionesService', () => {
  let service: SwalNotificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalNotificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
