import { Component } from '@angular/core';
import {
  ZardTabComponent,
  ZardTabGroupComponent,
} from '../../shared/components/tabs/tabs.component';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { ZardSelectItemComponent } from '../../shared/components/select/select-item.component';
import { ZardSelectComponent } from '../../shared/components/select/select.component';

@Component({
  selector: 'app-empleados-siiu',
  standalone: true,
  imports: [
    ZardTabComponent,
    ZardTabGroupComponent,
    ZardAlertComponent,
    ZardSelectItemComponent,
    ZardSelectComponent,
  ],
  templateUrl: './empleados-siiu.component.html',
  styleUrl: './empleados-siiu.component.scss',
})
export class EmpleadosSIIUComponent {}
