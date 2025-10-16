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
import { ZardTableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-participantes',
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
    ZardTableComponent,
  ],
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.scss',
})
export class ParticipantesComponent {
  participantes = [
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
