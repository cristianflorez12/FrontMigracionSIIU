import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-compromisos',
  standalone: true,
  imports: [
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ZardAlertComponent,
  ],
  templateUrl: './compromisos.component.html',
  styleUrl: './compromisos.component.scss',
})
export class CompromisosComponent {
  displayedColumns: string[] = ['descripcion', 'acciones', 'notas'];
  dataSource: object[] = [
    {
      compromiso: 'Compromiso 1',
      descripcion: 'Descripción del compromiso 1',
      notas: 'Notas del compromiso 1',
    },
    {
      compromiso: 'Compromiso 2',
      descripcion: 'Descripción del compromiso 2',
      notas: 'Notas del compromiso 2',
    },
    {
      compromiso: 'Compromiso 3',
      descripcion: 'Descripción del compromiso 3',
      notas: 'Notas del compromiso 3',
    },
  ];
}
