import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

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

  // Columnas que EXISTEN realmente en el backend
  displayedColumns = [
    'codigo',
    'centroGestion',
    'estado',
    'convocatoria',
    'procesoSeleccion',
    'subtipoProyecto'
  ];

  dataSource: any[] = [];

  proyectoForm!: FormGroup;

  // Alineado con backend
  initialValues = {
    codigo: '',
    centroGestion: '',
    estado: '',
    convocatoria: '',
    procesoSeleccion: '',
    subtipoProyecto: ''
  };

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProyectos();

    this.proyectoForm = this.fb.group({
      codigo: [''],
      centroGestion: [''],
      estado: [''],
      convocatoria: [''],
      procesoSeleccion: [''],
      subtipoProyecto: ['']
    });
  }

  // --------------------------------------------------------
  // GET /api/proyectos
  // --------------------------------------------------------
  cargarProyectos() {
    this.api.get<any>('/api/proyectos').subscribe({
      next: (resp) => {
        console.log('Respuesta GET:', resp);

        // Corrige la carga: resp es un ARRAY, no resp.data
        this.dataSource = Array.isArray(resp) ? resp : (resp?.data ?? []);
      },
      error: (err) => {
        console.error('Error cargando proyectos:', err);

        // Mock de respaldo
        this.dataSource = [
          {
            codigo: 'P001',
            centroGestion: 'CG-01',
            estado: 'Activo',
            convocatoria: '2024',
            procesoSeleccion: 'Abierto',
            subtipoProyecto: 'Investigación',
          },
        ];
      },
    });
  }

  // --------------------------------------------------------
  // POST /api/proyectos/filtrar
  // --------------------------------------------------------
onSubmit() {
 
  const filtros = this.proyectoForm.value;
  
  const filtrosLimpios = Object.fromEntries(
    Object.entries(filtros).filter(([_, v]) => v !== '' && v !== null)
  );

  console.log('Enviando filtros:', filtrosLimpios);
  console.log('Enviando filtros:', filtrosLimpios);

  this.api.post<any>('/api/proyectos/filtrar', filtrosLimpios).subscribe({
    next: (resp) => {
      console.log('Respuesta filtro:', resp);

      this.dataSource = Array.isArray(resp)
        ? resp
        : (resp.data ?? []);

    },
    error: (err) => {
      console.error('Error filtrando proyectos:', err);
    }
  });
}
  // --------------------------------------------------------
  // Reset
  // --------------------------------------------------------
  onReset() {
    this.proyectoForm.reset(this.initialValues);
  }

  // --------------------------------------------------------
  // Navegar
  // --------------------------------------------------------
  onRowClick(codigoProyecto: string) {
    this.router.navigate(['/proyecto', codigoProyecto, 'inicio-formal']);
  }

}
