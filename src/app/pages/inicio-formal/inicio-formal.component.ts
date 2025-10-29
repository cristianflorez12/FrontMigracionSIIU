import { Component, OnInit } from '@angular/core';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-formal',
  standalone: true,
  imports: [
    ZardAlertComponent,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './inicio-formal.component.html',
  styleUrls: ['./inicio-formal.component.scss'],
})
export class InicioFormalComponent implements OnInit {
  InicioForm!: FormGroup;

  initialValues = {
    codigoInterno: '',
    duracionProyecto: '',
    fechaInicio: '',
    fechaFin: '',
    fechaAprobacion: '',
  };

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.InicioForm = this.fb.group({
      codigoInterno: ['', Validators.required],
      duracionProyecto: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      fechaAprobacion: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.InicioForm.invalid) {
      this.InicioForm.markAllAsTouched();
      return;
    }

    const body = this.InicioForm.value;
    console.log('Formulario enviado:', body);
    this.api.post<any[]>('/api/proyectos', body).subscribe({
      next: (data) => console.log('Respuesta del servidor:', data),
      error: (err) => console.error('Error enviando proyectos:', err),
    });
  }

  onReset() {
    this.InicioForm.reset(this.initialValues);
  }
}
