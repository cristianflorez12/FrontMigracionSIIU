import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ProjectContextService } from '../../services/project-context.service';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

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

  codigoProyecto: string = '';

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

      this.codigoProyecto = params['codigo'];

      this.projectContext.setProjectId(this.codigoProyecto);

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

  this.api.get<any>(`/api/proyectos/${this.codigoProyecto}`).subscribe({
    next: (proyecto) => {
      console.log('Proyecto cargado:', proyecto);

      // Adaptamos al formato del formulario
      const proyectoAdaptado: Proyecto = {
        codigoInterno: proyecto.codigo || '',
        duracionProyecto: proyecto.duracion?.toString() || '',
        fechaInicio: proyecto.fechaRegistro || '',
        fechaFin: this.calcularFechaFin(proyecto.fechaRegistro, proyecto.duracion),
        fechaAprobacion: proyecto.fechaAprobacionRechazo || ''
      };

      this.llenarFormulario(proyectoAdaptado);
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error al cargar:', error);
      console.warn('Usando mock...');
      this.llenarFormulario(this.mockProyecto);
      this.errorMessage =
        'No se pudo conectar al servidor. Mostrando datos de prueba.';
      this.usandoMock = true;
      this.isLoading = false;
    },
  });
}

  private calcularFechaFin(fechaInicio: string, duracionMeses: number): string {
  if (!fechaInicio || !duracionMeses) return '';

  const date = new Date(fechaInicio);
  date.setMonth(date.getMonth() + duracionMeses);

  // Pad ISO: yyyy-MM-dd
  return date.toISOString().split('T')[0];
}

  private llenarFormulario(proyecto: Proyecto): void {
  this.InicioForm.patchValue({
    codigoInterno: proyecto.codigoInterno || '',
    duracionProyecto: proyecto.duracionProyecto || '',
    fechaInicio: proyecto.fechaInicio || '',
    fechaFin: proyecto.fechaFin || '',
    fechaAprobacion: proyecto.fechaAprobacion || ''
  });

  this.initialValues = this.InicioForm.value;
}

  onSubmit() {
    if (this.InicioForm.invalid) {
      this.InicioForm.markAllAsTouched();
      return;
    }

    const payload = this.InicioForm.value;

    console.log('Enviando datos:', payload);

    this.api
      .post<{ success: boolean; message: string }>(
        `/api/proyectos/${this.codigoProyecto}`,
        payload
      )
      .subscribe({
        next: (data) => console.log('Respuesta servidor:', data),
        error: (err) => console.error('Error:', err),
      });
  }

  onReset() {
    this.InicioForm.reset(this.initialValues);
  }
}
