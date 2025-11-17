import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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

export interface Compromiso {
  id?: string;
  compromiso?: string;
  descripcion: string;
  notas?: string;
  fechaEstimada?: string;
}

@Component({
  selector: 'app-compromisos',
  standalone: true,
  imports: [
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ZardAlertComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './compromisos.component.html',
  styleUrl: './compromisos.component.scss',
})
export class CompromisosComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);

  displayedColumns: string[] = ['descripcion', 'acciones', 'notas'];

  dataSource: Compromiso[] = [];
  compromisosForm!: FormGroup;
  isLoading = true;
  errorMessage = '';
  usandoMock = false;
  projectId: string = '';

  private mockCompromisos: Compromiso[] = [
    {
      id: '1',
      compromiso: 'Compromiso 1',
      descripcion: 'Descripción del compromiso 1',
      notas: 'Notas del compromiso 1',
    },
    {
      id: '2',
      compromiso: 'Compromiso 2',
      descripcion: 'Descripción del compromiso 2',
      notas: 'Notas del compromiso 2',
    },
    {
      id: '3',
      compromiso: 'Compromiso 3',
      descripcion: 'Descripción del compromiso 3',
      notas: 'Notas del compromiso 3',
    },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'] || '1';
      this.projectContext.setProjectId(this.projectId);

      this.compromisosForm = this.fb.group({
        compromisos: this.fb.array([]),
      });
      this.cargarCompromisos();
      this.cdr.markForCheck();
    });
  }

  private cargarCompromisos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.usandoMock = false;

    this.apiService
      .get<Compromiso[]>(`/api/compromisos/${this.projectId}`)
      .subscribe({
        next: (compromisos) => {
          console.log('Compromisos cargados:', compromisos);
          this.dataSource = compromisos;
          this.setFormArrayFromData(compromisos);
          this.isLoading = false;
          this.usandoMock = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error al cargar los compromisos:', error);
          console.warn('Cargando datos de prueba (mock)...');
          this.dataSource = this.mockCompromisos;
          this.usandoMock = true;
          this.isLoading = false;
          this.errorMessage =
            'No se pudo conectar al servidor. Mostrando datos de prueba.';
          this.setFormArrayFromData(this.mockCompromisos);
          this.cdr.detectChanges();
        },
      });
  }

  private createCompromisoGroup(item: Partial<Compromiso> = {}): FormGroup {
    return this.fb.group({
      id: [item.id || ''],
      compromiso: [item.compromiso || ''],
      descripcion: [item.descripcion || ''],
      notas: [item.notas || ''],
      fechaEstimada: [item.fechaEstimada || ''],
    });
  }

  private setFormArrayFromData(data: Compromiso[]): void {
    const fa = this.compromisosForm.get('compromisos') as FormArray;
    fa.clear();
    data.forEach((item) => fa.push(this.createCompromisoGroup(item)));
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  onSubmit(): void {
    if (this.compromisosForm.invalid) {
      this.compromisosForm.markAllAsTouched();
      return;
    }

    const body = this.compromisosForm.value;
    console.log('Formulario enviado:', body);
    this.apiService
      .post<{ success: boolean; message: string }>(
        '/api/compromisos/actualizar',
        body
      )
      .subscribe({
        next: (response) => {
          console.log('Compromisos guardados:', response);
          this.cargarCompromisos();
        },
        error: (err: Error) => {
          console.error('Error guardando compromisos:', err);
          this.errorMessage = 'Error al guardar los compromisos';
        },
      });
  }

  get compromisosArray() {
    return this.compromisosForm.get('compromisos') as FormArray;
  }
}
