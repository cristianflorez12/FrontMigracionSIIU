import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
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
  ],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
  displayedColumns: string[] = [
    'codigo',
    'proyecto',
    'estado',
    'nivel',
    'convocatoria',
    'responsable',
    'ipCoordinador',
    'tipoProyecto',
    'acciones',
  ];

  dataSource: any[] = [];

  proyectoForm!: FormGroup;

  initialValues = {
    codigoProyecto: '',
    centroGestion: '',
    estado: '',
    convocatoria: '',
    procesoSeleccion: '',
    tipoProyecto: '',
  };

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const endpoint = 'https://waitingforendpont.com/users';
    this.api.get<any[]>(endpoint).subscribe({
      next: (data) => (this.dataSource = data),
      error: (err) => {
        console.error('Error cargando proyectos:', err);
        this.dataSource = [
          {
            id: '1',
            codigo: 'P001',
            proyecto: 'Proyecto de Investigación A',
            estado: 'Activo',
            nivel: 'Nacional',
            convocatoria: '2024',
            responsable: 'Dr. Juan Pérez',
            ipCoordinador: '192.168.1.1',
            tipoProyecto: 'Científico',
          },
        ];
      },
    });

    this.proyectoForm = this.fb.group({
      codigoProyecto: [''],
      centroGestion: [''],
      estado: [''],
      convocatoria: [''],
      procesoSeleccion: [''],
      tipoProyecto: [''],
    });
  }

  onSubmit() {
    if (this.proyectoForm.invalid) {
      this.proyectoForm.markAllAsTouched();
      return;
    }

    const body = this.proyectoForm.value;
    console.log('Formulario enviado:', body);
    this.api.post<any[]>('/api/proyectos', body).subscribe({
      next: (data) => (this.dataSource = data),
      error: (err) => {
        console.error('Error cargando proyectos:', err);
        this.dataSource = [
          {
            id: '1',
            codigo: 'P001',
            proyecto: 'Proyecto de Investigación A',
            estado: 'Activo',
            nivel: 'Nacional',
            convocatoria: '2024',
            responsable: 'Dr. Juan Pérez',
            ipCoordinador: '192.168.1.1',
            tipoProyecto: 'Científico',
          },
        ];
      },
    });
  }

  onReset() {
    this.proyectoForm.reset(this.initialValues);
  }

  onRowClick(projectId: string) {
    this.router.navigate(['/proyecto', projectId, 'inicio-formal']);
  }
}
