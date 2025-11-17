import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarActaInicioComponent } from './generar-acta-inicio.component';

describe('GenerarActaInicioComponent', () => {
  let component: GenerarActaInicioComponent;
  let fixture: ComponentFixture<GenerarActaInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarActaInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarActaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
