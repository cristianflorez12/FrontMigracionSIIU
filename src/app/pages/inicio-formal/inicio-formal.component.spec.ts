import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFormalComponent } from './inicio-formal.component';

describe('InicioFormalComponent', () => {
  let component: InicioFormalComponent;
  let fixture: ComponentFixture<InicioFormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioFormalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioFormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
