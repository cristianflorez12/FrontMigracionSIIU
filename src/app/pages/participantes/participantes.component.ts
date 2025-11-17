import { Component, OnInit, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { ApiService } from '../../services/api.service';

export interface Participante {
  id?: string;
  nombre: string;
  grupoInvestigacion: string;
  rol: string;
  dedicacion: string;
  programaApoyado: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  identificacion?: string;
  institucion?: string;
  vinculoUdeA?: string;
  fechaIngreso?: string;
  dedicacionHorasFuera?: { horas?: number; meses?: number };
  dedicacionHorasDentro?: { horas?: number; meses?: number };
  participacionBeneficios?: number;
  notaAclaratoria?: string;
  funciones?: string;
  dependencia?: string;
  grupo?: string;
  observaciones?: string;
}

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [
    ZardAlertComponent,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss',
})
export class ParticipantesComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  displayedColumns: string[] = [
    'empty',
    'nombre',
    'grupoInvestigacion',
    'rol',
    'dedicacion',
    'programaApoyado',
    'acciones',
  ];
  dataSource: Participante[] = [];
  isLoading = true;
  errorMessage = '';
  usandoMock = false;
  projectId = '1';
  participanteEditandoId: string | null = null;
  formularioParticipante!: FormGroup;
  participanteSeleccionado: Participante | null = null;

  // Propiedades para mostrar datos dinámicamente
  nombreProyecto = 'Proyecto prueba';
  codigoProyecto = '2024-72150';
  fechaInicio = '20/08/2024';
  fechaFin = '20/08/2025';
  duracion = '12 meses';

  nombreParticipante = '';
  identificacionParticipante = '';
  fechaInicioParticipante = '';
  institucionParticipante = '';
  grupoParticipante = '';
  rolParticipante = '';
  vinculoUdeAParticipante = '';
  totalHorasSemana = 0;

  private mockParticipantes: Participante[] = [
    {
      id: '1',
      nombre: 'Juan Pérez García',
      grupoInvestigacion: 'Grupo de Investigación en IA',
      rol: 'Investigador Principal',
      dedicacion: 'Tiempo completo (100%)',
      programaApoyado: 'Ingeniería de Sistemas - 60%',
      email: 'juan.perez@universidad.edu.co',
      telefono: '(4) 2234567',
      direccion: 'Carrera 50 #25-80, Medellín',
    },
    {
      id: '2',
      nombre: 'María González López',
      grupoInvestigacion: 'Grupo de Tecnología Aplicada',
      rol: 'Co-investigador',
      dedicacion: 'Tiempo parcial (50%)',
      programaApoyado: 'Ingeniería de Software - 40%',
      email: 'maria.gonzalez@universidad.edu.co',
      telefono: '(1) 6234567',
      direccion: 'Calle 35 #10-15, Bogotá',
    },
    {
      id: '3',
      nombre: 'Carlos Rodríguez Martínez',
      grupoInvestigacion: 'Grupo de Desarrollo de Software',
      rol: 'Estudiante Investigador',
      dedicacion: 'Tiempo parcial (25%)',
      programaApoyado: 'Ciencias de la Computación - 30%',
      email: 'carlos.rodriguez@universidad.edu.co',
      telefono: '(2) 3234567',
      direccion: 'Avenida Paseo Peatonal #5-100, Cali',
    },
    {
      id: '4',
      nombre: 'Laura Fernández Díaz',
      grupoInvestigacion: 'Grupo de Análisis de Datos',
      rol: 'Consultor Técnico',
      dedicacion: 'Tiempo parcial (30%)',
      programaApoyado: 'Estadística Aplicada - 50%',
      email: 'laura.fernandez@universidad.edu.co',
      telefono: '(5) 4234567',
      direccion: 'Diagonal 45 #20-30, Cúcuta',
    },
  ];

  ngOnInit(): void {
    this.cargarParticipantes();
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formularioParticipante = this.fb.group({
      vinculoUdeA: ['', Validators.required],
      grupo: [''],
      rol: ['', Validators.required],
      dependencia: ['', Validators.required],
      dedicacionFueraHoras: [0],
      dedicacionFueraMeses: [0],
      dedicacionDentroHoras: [0],
      dedicacionDentroMeses: [0],
      funciones: ['', Validators.required],
      observaciones: [''],
      institucion: [''],
    });
  }

  private cargarParticipantes(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.usandoMock = false;

    this.apiService
      .get<Participante[]>(`/api/participantes/${this.projectId}`)
      .subscribe({
        next: (participantes) => {
          console.log('Participantes cargados:', participantes);
          this.dataSource = participantes;
          this.isLoading = false;
          this.usandoMock = false;
        },
        error: (error) => {
          console.error('Error al cargar los participantes:', error);
          console.warn('Cargando datos de prueba (mock)...');
          this.dataSource = this.mockParticipantes;
          this.errorMessage =
            'No se pudo conectar al servidor. Mostrando datos de prueba.';
          this.usandoMock = true;
          this.isLoading = false;
        },
      });
  }

  abrirEdicion(participante: Participante): void {
    this.participanteSeleccionado = participante;
    this.participanteEditandoId = participante.id || null;

    // Llenar datos dinámicos
    this.nombreParticipante = participante.nombre || '';
    this.identificacionParticipante = participante.identificacion || '';
    this.fechaInicioParticipante = participante.fechaIngreso || '';
    this.institucionParticipante = participante.institucion || '';
    this.grupoParticipante = participante.grupoInvestigacion || '';
    this.rolParticipante = participante.rol || '';
    this.vinculoUdeAParticipante = participante.vinculoUdeA || '';

    // Calcular total de horas
    const horasFuera = participante.dedicacionHorasFuera?.horas || 0;
    const horasDentro = participante.dedicacionHorasDentro?.horas || 0;
    this.totalHorasSemana = horasFuera + horasDentro;

    // Llenar formulario
    this.formularioParticipante.patchValue({
      rol: participante.rol,
      vinculoUdeA: participante.vinculoUdeA,
      dependencia: participante.dependencia,
      grupo: participante.grupo,
      institucion: participante.institucion,
      dedicacionFueraHoras: participante.dedicacionHorasFuera?.horas || 0,
      dedicacionFueraMeses: participante.dedicacionHorasFuera?.meses || 0,
      dedicacionDentroHoras: participante.dedicacionHorasDentro?.horas || 0,
      dedicacionDentroMeses: participante.dedicacionHorasDentro?.meses || 0,
      funciones: participante.funciones || '',
      observaciones: participante.observaciones || '',
    });
  }

  cerrarEdicion(): void {
    this.participanteEditandoId = null;
    this.participanteSeleccionado = null;
    this.formularioParticipante.reset();
    // Limpiar datos dinámicos
    this.nombreParticipante = '';
    this.identificacionParticipante = '';
    this.fechaInicioParticipante = '';
    this.institucionParticipante = '';
    this.grupoParticipante = '';
    this.rolParticipante = '';
    this.vinculoUdeAParticipante = '';
    this.totalHorasSemana = 0;
  }

  guardarParticipante(): void {
    if (this.formularioParticipante.invalid) {
      this.formularioParticipante.markAllAsTouched();
      return;
    }

    if (!this.participanteSeleccionado?.id) {
      console.error('No hay participante seleccionado');
      return;
    }

    const formValue = this.formularioParticipante.value;
    const datos = {
      id: this.participanteSeleccionado.id,
      nombre: this.participanteSeleccionado.nombre,
      identificacion: this.participanteSeleccionado.identificacion,
      institucion: formValue.institucion,
      grupoInvestigacion: this.participanteSeleccionado.grupoInvestigacion,
      rol: formValue.rol,
      vinculoUdeA: formValue.vinculoUdeA,
      dependencia: formValue.dependencia,
      grupo: formValue.grupo,
      dedicacionHorasFuera: {
        horas: formValue.dedicacionFueraHoras,
        meses: formValue.dedicacionFueraMeses,
      },
      dedicacionHorasDentro: {
        horas: formValue.dedicacionDentroHoras,
        meses: formValue.dedicacionDentroMeses,
      },
      funciones: formValue.funciones,
      observaciones: formValue.observaciones,
      dedicacion: this.participanteSeleccionado.dedicacion,
      programaApoyado: this.participanteSeleccionado.programaApoyado,
      email: this.participanteSeleccionado.email,
      telefono: this.participanteSeleccionado.telefono,
      direccion: this.participanteSeleccionado.direccion,
    };

    console.log('Guardando participante:', datos);
    this.apiService
      .post<{ success: boolean; message: string }>(
        '/api/participantes/actualizar',
        datos
      )
      .subscribe({
        next: (response) => {
          console.log('Participante actualizado:', response);
          this.cerrarEdicion();
          this.cargarParticipantes();
        },
        error: (error) => {
          console.error('Error al actualizar participante:', error);
        },
      });
  }
}
