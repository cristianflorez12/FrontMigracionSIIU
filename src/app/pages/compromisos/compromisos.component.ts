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
  selector: 'app-compromisos',
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
  templateUrl: './compromisos.component.html',
  styleUrl: './compromisos.component.scss',
})
export class CompromisosComponent {
  compromisos = [
    {
      compromiso: 'Compromiso 1',
      descripcion: 'Descripción del compromiso 1',
    },
    {
      compromiso: 'Compromiso 2',
      descripcion: 'Descripción del compromiso 2',
    },
    {
      compromiso: 'Compromiso 3',
      descripcion: 'Descripción del compromiso 3',
    },
  ];
}
