import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

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
  ],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss',
})
export class ParticipantesComponent {
  displayedColumns: string[] = [
    'empty',
    'nombre',
    'grupoInvestigacion',
    'rol',
    'dedicacion',
    'programaApoyado',
    'acciones',
  ];
  dataSource = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      rol: 'Estudiante',
      email: 'juan.perez@example.com',
      telefono: '123-456-7890',
      direccion: 'Calle Falsa 123',
      grupoInvestigacion: 'Grupo A',
      rolProyecto: 'Desarrollador',
      dedicacion: 'Tiempo completo',
      programaApoyado: 'Programa X',
    },
  ];
}
