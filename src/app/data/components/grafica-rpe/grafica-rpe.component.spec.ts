import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaRpeComponent } from './grafica-rpe.component';

describe('GraficaRpeComponent', () => {
  let component: GraficaRpeComponent;
  let fixture: ComponentFixture<GraficaRpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaRpeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaRpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
