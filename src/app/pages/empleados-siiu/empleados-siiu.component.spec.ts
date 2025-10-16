import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosSIIUComponent } from './empleados-siiu.component';

describe('EmpleadosSIIUComponent', () => {
  let component: EmpleadosSIIUComponent;
  let fixture: ComponentFixture<EmpleadosSIIUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosSIIUComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosSIIUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
