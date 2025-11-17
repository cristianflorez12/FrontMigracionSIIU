import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarInicioFormalComponent } from './cerrar-inicio-formal.component';

describe('CerrarInicioFormalComponent', () => {
  let component: CerrarInicioFormalComponent;
  let fixture: ComponentFixture<CerrarInicioFormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerrarInicioFormalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerrarInicioFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
