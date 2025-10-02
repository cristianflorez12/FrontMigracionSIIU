import { Component } from '@angular/core';
import {
  ZardTabComponent,
  ZardTabGroupComponent,
} from '../../shared/components/tabs/tabs.component';
import { ZardButtonComponent } from '../../shared/components/button/button.component';
import { ZardSelectItemComponent } from '../../shared/components/select/select-item.component';
import { ZardSelectComponent } from '../../shared/components/select/select.component';
import { ZardAccordionComponent } from '../../shared/components/accordion/accordion.component';
import { ZardAccordionItemComponent } from '../../shared/components/accordion/accordion-item.component';
import { ZardDividerComponent } from '../../shared/components/divider/divider.component';
import { ZardMenuModule } from '../../shared/components/menu/menu.module';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { ZardInputDirective } from '../../shared/components/input/input.directive';

@Component({
  selector: 'app-etapas',
  standalone: true,
  imports: [
    ZardTabComponent,
    ZardTabGroupComponent,
    ZardButtonComponent,
    ZardSelectComponent,
    ZardSelectItemComponent,
    ZardAccordionComponent,
    ZardAccordionItemComponent,
    ZardDividerComponent,
    ZardMenuModule,
    ZardAlertComponent,
    ZardInputDirective,
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
