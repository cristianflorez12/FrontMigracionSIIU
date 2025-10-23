import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-empleados-siiu',
  standalone: true,
  imports: [
    ZardAlertComponent,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
  ],
  templateUrl: './empleados-siiu.component.html',
  styleUrl: './empleados-siiu.component.scss',
})
export class EmpleadosSIIUComponent {
  showEmpleado = false;

  toggleEmpleado(): void {
    this.showEmpleado = !this.showEmpleado;
  }
}
