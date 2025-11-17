import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectContextService } from '../../services/project-context.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-cerrar-inicio-formal',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ZardAlertComponent,
  ],
  templateUrl: './cerrar-inicio-formal.component.html',
  styleUrl: './cerrar-inicio-formal.component.scss',
})
export class CerrarInicioFormalComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);

  projectId = '';
  aceptaTerminos = false;
  aceptaLegitimidad = false;
  aceptaResponsabilidad = false;
  procesando = false;
  confirmacionEnviada = false;
  mensajeExito = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'] || '1';
      this.projectContext.setProjectId(this.projectId);
    });
  }

  get todosAceptados(): boolean {
    return (
      this.aceptaTerminos &&
      this.aceptaLegitimidad &&
      this.aceptaResponsabilidad
    );
  }

  confirmarCierre(): void {
    if (!this.todosAceptados) {
      return;
    }

    this.procesando = true;

    // Simular envio de confirmacion
    setTimeout(() => {
      this.procesando = false;
      this.confirmacionEnviada = true;
      this.mensajeExito = `El inicio formal del proyecto ${this.projectId} ha sido completado exitosamente. No sera posible realizar cambios en la informacion registrada.`;

      // Auto-ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        this.confirmacionEnviada = false;
      }, 5000);
    }, 2000);
  }

  reiniciar(): void {
    this.aceptaTerminos = false;
    this.aceptaLegitimidad = false;
    this.aceptaResponsabilidad = false;
    this.confirmacionEnviada = false;
  }
}
