import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRpeUsuarioComponent } from './editar-rpe-usuario.component';

describe('EditarRpeUsuarioComponent', () => {
  let component: EditarRpeUsuarioComponent;
  let fixture: ComponentFixture<EditarRpeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarRpeUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRpeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
