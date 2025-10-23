import { Component } from '@angular/core';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

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
  ],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
})
export class ProyectosComponent {
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
  dataSource: string[] = [
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
}
