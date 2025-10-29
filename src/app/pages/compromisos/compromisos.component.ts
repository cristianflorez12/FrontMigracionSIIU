import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  displayedColumns: string[] = ['descripcion', 'acciones', 'notas'];

  dataSource: any[] = [];

  compromisosForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.compromisosForm = this.fb.group({
      compromisos: this.fb.array([]),
    });

    // For testing purposes, let's add some initial data
    const mockData = [
      {
        compromiso: 'Compromiso 1',
        descripcion: 'Descripción del compromiso 1',
        notas: 'Notas del compromiso 1',
      },
      {
        compromiso: 'Compromiso 2',
        descripcion: 'Descripción del compromiso 2',
        notas: 'Notas del compromiso 2',
      },
      {
        compromiso: 'Compromiso 3',
        descripcion: 'Descripción del compromiso 3',
        notas: 'Notas del compromiso 3',
      },
    ];

    this.setFormArrayFromData(mockData);
  }

  private createCompromisoGroup(item: any = {}) {
    return this.fb.group({
      compromiso: [item.compromiso || ''],
      descripcion: [item.descripcion || ''],
      notas: [item.notas || ''],
    });
  }

  private setFormArrayFromData(data: any[]) {
    const fa = this.compromisosForm.get('compromisos') as FormArray;
    fa.clear();
    data.forEach((item) => fa.push(this.createCompromisoGroup(item)));
  }

  onSubmit() {
    if (this.compromisosForm.invalid) {
      this.compromisosForm.markAllAsTouched();
      return;
    }

    const body = this.compromisosForm.value;
    console.log('Formulario enviado:', body);
    this.api.post<any[]>('/api/proyectos', body).subscribe({
      next: (data) => (this.dataSource = data),
      error: (err) => {
        console.error('Error guardando compromisos:', err);
        this.dataSource = [
          {
            compromiso: 'Compromiso 1',
            descripcion: 'Descripción del compromiso 1',
            notas: 'Notas del compromiso 1',
          },
          {
            compromiso: 'Compromiso 2',
            descripcion: 'Descripción del compromiso 2',
            notas: 'Notas del compromiso 2',
          },
          {
            compromiso: 'Compromiso 3',
            descripcion: 'Descripción del compromiso 3',
            notas: 'Notas del compromiso 3',
          },
        ];
      },
    });
  }

  get compromisosArray() {
    return this.compromisosForm.get('compromisos') as FormArray;
  }
}
