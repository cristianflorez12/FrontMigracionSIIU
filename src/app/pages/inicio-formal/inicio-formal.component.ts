import { Component, OnInit, inject } from '@angular/core';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute } from '@angular/router';
import { ProjectContextService } from '../../services/project-context.service';

export interface Proyecto {
  id?: string;
  codigoInterno: string;
  duracionProyecto: string;
  fechaInicio: string;
  fechaFin: string;
  fechaAprobacion: string;
  requiereDocumentoAprobacion?: boolean;
  centroAdministrativo?: string;
  correoElectronico?: string;
}

@Component({
  selector: 'app-inicio-formal',
  standalone: true,
  imports: [
    ZardAlertComponent,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './inicio-formal.component.html',
  styleUrls: ['./inicio-formal.component.scss'],
})
export class InicioFormalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);

  InicioForm!: FormGroup;
  isLoading = true;
  errorMessage = '';
  usandoMock = false;
  projectId: string = '';

  private mockProyecto: Proyecto = {
    id: '1',
    codigoInterno: 'PROY-2025-001',
    duracionProyecto: '12 meses',
    fechaInicio: '2025-01-15',
    fechaFin: '2026-01-15',
    fechaAprobacion: '2024-12-15',
    requiereDocumentoAprobacion: true,
    centroAdministrativo: 'Centro de Innovación Tecnológica',
    correoElectronico: 'proyecto.oficial@universidad.edu.co',
  };

  initialValues = {
    codigoInterno: '',
    duracionProyecto: '',
    fechaInicio: '',
    fechaFin: '',
    fechaAprobacion: '',
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'] || '1';
      this.projectContext.setProjectId(this.projectId);

      this.initializeForm();
      this.cargarProyecto();
    });
  }

  private initializeForm(): void {
    this.InicioForm = this.fb.group({
      codigoInterno: ['', Validators.required],
      duracionProyecto: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaAprobacion: ['', Validators.required],
    });
  }

  private cargarProyecto(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.usandoMock = false;

    // Ajusta esta URL según tu backend - incluye el ID del proyecto
    this.api.get<Proyecto>(`/api/proyectos/${this.projectId}`).subscribe({
      next: (proyecto) => {
        console.log('Proyecto cargado:', proyecto);
        this.llenarFormulario(proyecto);
        this.isLoading = false;
        this.usandoMock = false;
      },
      error: (error) => {
        console.error('Error al cargar el proyecto:', error);
        console.warn('Cargando datos de prueba (mock)...');
        this.llenarFormulario(this.mockProyecto);
        this.errorMessage =
          'No se pudo conectar al servidor. Mostrando datos de prueba.';
        this.usandoMock = true;
        this.isLoading = false;
      },
    });
  }

  private llenarFormulario(proyecto: Proyecto): void {
    this.InicioForm.patchValue({
      codigoInterno: proyecto.codigoInterno || '',
      duracionProyecto: proyecto.duracionProyecto || '',
      fechaInicio: proyecto.fechaInicio || '',
      fechaFin: proyecto.fechaFin || '',
      fechaAprobacion: proyecto.fechaAprobacion || '',
    });

    // Guardar valores iniciales para el reset
    this.initialValues = this.InicioForm.value;
  }

  onSubmit() {
    if (this.InicioForm.invalid) {
      this.InicioForm.markAllAsTouched();
      return;
    }

    const body = this.InicioForm.value;
    console.log('Formulario enviado:', body);
    this.api
      .post<{ success: boolean; message: string }>('/api/proyectos', body)
      .subscribe({
        next: (data) => console.log('Respuesta del servidor:', data),
        error: (err) => console.error('Error enviando proyectos:', err),
      });
  }

  onReset() {
    this.InicioForm.reset(this.initialValues);
  }
}
