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
      nombre: ['', Validators.required],
      identificacion: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      institucion: ['', Validators.required],
      grupo: ['', Validators.required],
      rol: ['', Validators.required],
      vinculoUdeA: ['', Validators.required],
      dependencia: ['', Validators.required],
      dedicacionHorasFuera: this.fb.group({
        horas: [0],
        meses: [0],
      }),
      dedicacionHorasDentro: this.fb.group({
        horas: [0],
        meses: [0],
      }),
      participacionBeneficios: [0, Validators.required],
      notaAclaratoria: [''],
      funciones: ['', Validators.required],
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
    this.participanteEditandoId = participante.id || null;
    this.formularioParticipante.patchValue({
      nombre: participante.nombre,
      identificacion: participante.identificacion,
      institucion: participante.institucion,
      grupo: participante.grupoInvestigacion,
      rol: participante.rol,
      vinculoUdeA: participante.vinculoUdeA,
      dependencia: participante.dependencia,
      funciones: participante.funciones,
      notaAclaratoria: participante.notaAclaratoria,
      participacionBeneficios: participante.participacionBeneficios,
    });
  }

  cerrarEdicion(): void {
    this.participanteEditandoId = null;
    this.formularioParticipante.reset();
  }

  guardarParticipante(): void {
    if (this.formularioParticipante.invalid) {
      this.formularioParticipante.markAllAsTouched();
      return;
    }

    const datos = this.formularioParticipante.value;
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
