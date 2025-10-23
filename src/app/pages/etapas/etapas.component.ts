import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

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
  ],
  templateUrl: './etapas.component.html',
  styleUrl: './etapas.component.scss',
})
export class EtapasComponent {
  etapas = [
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
  selectedEtapa = this.etapas[0].value;
}
