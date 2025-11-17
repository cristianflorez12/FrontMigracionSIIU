import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { ApiService } from '../../services/api.service';
import { ProjectContextService } from '../../services/project-context.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Etapa {
  id?: string;
  etapa: string;
  descripcion: string;
  duracion?: string;
  ejecucionPresupuestal?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

@Component({
  selector: 'app-etapas',
  standalone: true,
  imports: [
    ZardAlertComponent,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './etapas.component.html',
  styleUrl: './etapas.component.scss',
})
export class EtapasComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);

  etapas: Etapa[] = [];
  etapasForm!: FormGroup;
  isLoading = true;
  errorMessage = '';
  usandoMock = false;
  projectId: string = '';

  private mockEtapas: Etapa[] = [
    {
      id: '1',
      etapa: 'Etapa 1',
      descripcion: 'Planeación del proyecto y definición de objetivos',
      duracion: '2 semanas',
      ejecucionPresupuestal: 'si',
      fechaInicio: '2025-10-01',
      fechaFin: '2025-10-15',
    },
    {
      id: '2',
      etapa: 'Etapa 2',
      descripcion: 'Desarrollo de la solución principal',
      duracion: '6 semanas',
      ejecucionPresupuestal: 'si',
      fechaInicio: '2025-10-16',
      fechaFin: '2025-11-30',
    },
    {
      id: '3',
      etapa: 'Etapa 3',
      descripcion: 'Pruebas, ajustes y entrega final',
      duracion: '4 semanas',
      ejecucionPresupuestal: 'si',
      fechaInicio: '2025-12-01',
      fechaFin: '2025-12-31',
    },
  ];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'] || '1';
      this.projectContext.setProjectId(this.projectId);

      this.etapasForm = this.fb.group({
        compromisos: this.fb.array([]),
      });
      this.cargarEtapas();
    });
  }

  private cargarEtapas(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.usandoMock = false;

    this.api.get<Etapa[]>(`/api/etapas/${this.projectId}`).subscribe({
      next: (etapas) => {
        console.log('Etapas cargadas:', etapas);
        this.etapas = etapas;
        this.setFormArrayFromData(etapas);
        this.isLoading = false;
        this.usandoMock = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar las etapas:', error);
        console.warn('Cargando datos de prueba (mock)...');
        this.etapas = this.mockEtapas;
        this.usandoMock = true;
        this.isLoading = false;
        this.errorMessage =
          'No se pudo conectar al servidor. Mostrando datos de prueba.';
        this.setFormArrayFromData(this.mockEtapas);
        this.cdr.detectChanges();
      },
    });
  }

  private createEtapaGroup(item: Partial<Etapa> = {}): FormGroup {
    return this.fb.group({
      etapa: [item.etapa || ''],
      descripcion: [item.descripcion || ''],
      duracion: [item.duracion || ''],
      ejecucionPresupuestal: [item.ejecucionPresupuestal || ''],
      fechaInicio: [item.fechaInicio || ''],
      fechaFin: [item.fechaFin || ''],
    });
  }

  private setFormArrayFromData(data: Etapa[]): void {
    const fa = this.etapasForm.get('compromisos') as FormArray;
    fa.clear();
    data.forEach((item) => fa.push(this.createEtapaGroup(item)));
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  onSubmit(): void {
    if (this.etapasForm.invalid) {
      this.etapasForm.markAllAsTouched();
      return;
    }

    const body = this.etapasForm.value;
    console.log('Formulario enviado:', body);
    this.api
      .post<{ success: boolean; message: string }>(
        `/api/etapas/${this.projectId}`,
        body
      )
      .subscribe({
        next: (response) => {
          console.log('Etapas guardadas:', response);
          this.cargarEtapas();
        },
        error: (err) => {
          console.error('Error guardando etapas:', err);
          this.errorMessage = 'Error al guardar las etapas';
        },
      });
  }

  get etapasArray(): FormArray {
    return this.etapasForm.get('compromisos') as FormArray;
  }

  agregarEtapa(): void {
    const etapasFA = this.etapasForm.get('compromisos') as FormArray;
    const newEtapa = this.createEtapaGroup();
    etapasFA.push(newEtapa);
  }
}
