import { Component, OnInit } from '@angular/core';
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
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  constructor(private fb: FormBuilder, private api: ApiService) {}

  etapas: any[] = [];

  etapasForm!: FormGroup;

  ngOnInit() {
    this.etapasForm = this.fb.group({
      compromisos: this.fb.array([]),
    });

    // For testing purposes, let's add some initial data
    const mockData = [
      {
        etapa: 'Etapa 1',
        descripcion: 'Planeación del proyecto y definición de objetivos',
        duracion: '2 semanas',
        ejecucionPresupuestal: '10%',
        fechaInicio: '2025-10-01',
        fechaFin: '2025-10-15',
        value: 'etapa1',
      },
      {
        etapa: 'Etapa 2',
        descripcion: 'Desarrollo de la solución principal',
        duracion: '6 semanas',
        ejecucionPresupuestal: '40%',
        fechaInicio: '2025-10-16',
        fechaFin: '2025-11-30',
        value: 'etapa2',
      },
      {
        etapa: 'Etapa 3',
        descripcion: 'Pruebas, ajustes y entrega final',
        duracion: '4 semanas',
        ejecucionPresupuestal: '50%',
        fechaInicio: '2025-12-01',
        fechaFin: '2025-12-31',
        value: 'etapa3',
      },
    ];
    this.setFormArrayFromData(mockData);
  }

  private createEtapaGroup(item: any = {}) {
    return this.fb.group({
      etapa: [item.etapa || ''],
      descripcion: [item.descripcion || ''],
      duracion: [item.duracion || ''],
      ejecucionPresupuestal: [item.ejecucionPresupuestal || ''],
      fechaInicio: [item.fechaInicio || ''],
      fechaFin: [item.fechaFin || ''],
    });
  }

  private setFormArrayFromData(data: any[]) {
    const fa = this.etapasForm.get('compromisos') as FormArray;
    fa.clear();
    data.forEach((item) => fa.push(this.createEtapaGroup(item)));
  }

  onSubmit() {
    if (this.etapasForm.invalid) {
      this.etapasForm.markAllAsTouched();
      return;
    }

    const body = this.etapasForm.value;
    console.log('Formulario enviado:', body);
    this.api.post<any[]>('/api/proyectos', body).subscribe({
      next: (data) => (this.etapas = data),
      error: (err) => {
        console.error('Error guardando compromisos:', err);
        this.etapas = [
          {
            etapa: 'Etapa 1',
            descripcion: 'Planeación del proyecto y definición de objetivos',
            duracion: '2 semanas',
            ejecucionPresupuestal: '10%',
            fechaInicio: '2025-10-01',
            fechaFin: '2025-10-15',
            value: 'etapa1',
          },
          {
            etapa: 'Etapa 2',
            descripcion: 'Desarrollo de la solución principal',
            duracion: '6 semanas',
            ejecucionPresupuestal: '40%',
            fechaInicio: '2025-10-16',
            fechaFin: '2025-11-30',
            value: 'etapa2',
          },
          {
            etapa: 'Etapa 3',
            descripcion: 'Pruebas, ajustes y entrega final',
            duracion: '4 semanas',
            ejecucionPresupuestal: '50%',
            fechaInicio: '2025-12-01',
            fechaFin: '2025-12-31',
            value: 'etapa3',
          },
        ];
      },
    });
  }

  get etapasArray() {
    return this.etapasForm.get('compromisos') as FormArray;
  }

  agregarEtapa() {
    const etapasFA = this.etapasForm.get('compromisos') as FormArray;
    const newEtapa = this.createEtapaGroup();
    etapasFA.push(newEtapa);
  }
}
