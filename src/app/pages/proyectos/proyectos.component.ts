import { Component } from '@angular/core';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { ZardSelectItemComponent } from '../../shared/components/select/select-item.component';
import { ZardSelectComponent } from '../../shared/components/select/select.component';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [ZardAlertComponent, ZardSelectItemComponent, ZardSelectComponent],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss',
})
export class ProyectosComponent {}
