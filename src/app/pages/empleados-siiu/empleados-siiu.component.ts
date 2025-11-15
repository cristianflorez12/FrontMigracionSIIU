import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { ApiService } from '../../services/api.service';

export interface Empleado {
  id?: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  direccion?: string;
  correo?: string;
  telefono?: string;
  celular?: string;
}

export interface RegistroEmpleado {
  empleadoId?: string;
  identificacion: string;
  nombre: string;
  apellido: string;
  correo?: string;
  telefono?: string;
  rol: string;
  centroAdministrativo: string;
}

@Component({
  selector: 'app-empleados-siiu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ZardAlertComponent,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './empleados-siiu.component.html',
  styleUrl: './empleados-siiu.component.scss',
})
export class EmpleadosSIIUComponent {
  private apiService = inject(ApiService);

  showEmpleado = false;
  identificacion = '';
  nombre = '';
  apellido = '';
  empleados: Empleado[] = [];
  isLoading = false;
  errorMessage = '';
  usandoMock = false;
  empleadoSeleccionado: Empleado | null = null;
  rolSeleccionado = '';
  centroSeleccionado = '';
  isSaving = false;

  private mockEmpleados: Empleado[] = [
    {
      id: '1',
      identificacion: '1234567890',
      nombre: 'Juan',
      apellido: 'Pérez García',
      direccion: 'Carrera 50 #25-80, Medellín',
      correo: 'juan.perez@example.com',
      telefono: '(4) 2234567',
      celular: '3201234567',
    },
    {
      id: '2',
      identificacion: '9876543210',
      nombre: 'María',
      apellido: 'González López',
      direccion: 'Calle 35 #10-15, Bogotá',
      correo: 'maria.gonzalez@example.com',
      telefono: '(1) 6234567',
      celular: '3109876543',
    },
    {
      id: '3',
      identificacion: '5555555555',
      nombre: 'Carlos',
      apellido: 'Rodríguez Martínez',
      direccion: 'Avenida Paseo Peatonal #5-100, Cali',
      correo: 'carlos.rodriguez@example.com',
      telefono: '(2) 3234567',
      celular: '3215555555',
    },
  ];

  toggleEmpleado(): void {
    this.showEmpleado = !this.showEmpleado;
  }

  buscarEmpleados(): void {
    if (!this.identificacion && !this.nombre && !this.apellido) {
      this.errorMessage = 'Por favor, ingrese al menos un criterio de búsqueda';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.usandoMock = false;

    const searchCriteria: Empleado = {
      identificacion: this.identificacion,
      nombre: this.nombre,
      apellido: this.apellido,
    };

    // Ajusta esta URL según tu backend
    this.apiService
      .post<Empleado[]>('/api/empleados/buscar', searchCriteria)
      .subscribe({
        next: (data) => {
          this.empleados = data;
          this.isLoading = false;
          this.usandoMock = false;
        },
        error: (error) => {
          console.error('Error al buscar empleados:', error);
          console.warn('Cargando datos de prueba (mock)...');
          // Usar datos mock en caso de error
          this.empleados = this.mockEmpleados;
          this.usandoMock = true;
          this.errorMessage =
            'No se pudo conectar al servidor. Mostrando datos de prueba.';
          this.isLoading = false;
        },
      });
  }

  seleccionarEmpleado(empleado: Empleado): void {
    this.empleadoSeleccionado = empleado;
    console.log('Empleado seleccionado:', empleado);
  }

  onReset(): void {
    this.rolSeleccionado = '';
    this.centroSeleccionado = '';
    this.empleadoSeleccionado = null;
    this.errorMessage = '';
    console.log('Formulario limpiado');
  }

  guardarEmpleado(): void {
    if (
      !this.empleadoSeleccionado ||
      !this.rolSeleccionado ||
      !this.centroSeleccionado
    ) {
      this.errorMessage = 'Por favor, complete todos los campos requeridos';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const registroEmpleado: RegistroEmpleado = {
      empleadoId: this.empleadoSeleccionado.id,
      identificacion: this.empleadoSeleccionado.identificacion,
      nombre: this.empleadoSeleccionado.nombre,
      apellido: this.empleadoSeleccionado.apellido,
      correo: this.empleadoSeleccionado.correo,
      telefono: this.empleadoSeleccionado.telefono,
      rol: this.rolSeleccionado,
      centroAdministrativo: this.centroSeleccionado,
    };

    // Ajusta esta URL según tu backend
    this.apiService
      .post<{ success: boolean; message: string }>(
        '/api/empleados/guardar',
        registroEmpleado
      )
      .subscribe({
        next: (response) => {
          console.log('Empleado guardado exitosamente:', response);
          this.errorMessage = 'Empleado registrado correctamente';
          this.isSaving = false;
          // Opcional: limpiar después de guardar
          setTimeout(() => {
            this.onReset();
            this.showEmpleado = false;
          }, 2000);
        },
        error: (error) => {
          console.error('Error al guardar empleado:', error);
          this.errorMessage =
            'Error al guardar el empleado. Por favor, intente de nuevo.';
          this.isSaving = false;
        },
      });
  }
}
