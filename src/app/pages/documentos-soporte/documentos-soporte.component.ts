import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectContextService } from '../../services/project-context.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

export interface DocumentoSoporte {
  nombre: string;
  tamanio: string;
  tipo: string;
  fechaCarga: string;
}

@Component({
  selector: 'app-documentos-soporte',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ZardAlertComponent,
  ],
  templateUrl: './documentos-soporte.component.html',
  styleUrl: './documentos-soporte.component.scss',
})
export class DocumentosSoporteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);

  projectId: string = '';
  documentos: DocumentoSoporte[] = [];
  archivosSeleccionados: File[] = [];
  cargando = false;
  mensajeExito = '';
  mostrarMensaje = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'] || '1';
      this.projectContext.setProjectId(this.projectId);
    });
  }

  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.archivosSeleccionados = Array.from(input.files);
    }
  }

  cargarDocumentos(): void {
    if (this.archivosSeleccionados.length === 0) {
      return;
    }

    this.cargando = true;
    this.mostrarMensaje = false;

    // Simular carga de archivos con delay
    setTimeout(() => {
      // Convertir archivos seleccionados a DocumentoSoporte
      const nuevosDocumentos: DocumentoSoporte[] =
        this.archivosSeleccionados.map((archivo) => ({
          nombre: archivo.name,
          tamanio: this.formatearTamanio(archivo.size),
          tipo: archivo.type || 'Archivo',
          fechaCarga: new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
        }));

      // Agregar a la lista de documentos
      this.documentos = [...this.documentos, ...nuevosDocumentos];

      // Mostrar mensaje de éxito
      this.mensajeExito = `${this.archivosSeleccionados.length} archivo(s) cargado(s) exitosamente`;
      this.mostrarMensaje = true;

      // Limpiar selección de archivos
      this.archivosSeleccionados = [];
      const fileInput = document.getElementById(
        'fileInput'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      this.cargando = false;

      // Auto-ocultar mensaje después de 4 segundos
      setTimeout(() => {
        this.mostrarMensaje = false;
      }, 4000);
    }, 1500);
  }

  private formatearTamanio(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const tamanos = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + tamanos[i];
  }

  eliminarDocumento(index: number): void {
    this.documentos.splice(index, 1);
  }

  enviarDocumentos(): void {
    if (this.documentos.length === 0) {
      alert('Por favor carga al menos un documento antes de enviar');
      return;
    }

    this.cargando = true;

    // Simular envío de documentos
    setTimeout(() => {
      this.mensajeExito = `Se han enviado ${this.documentos.length} documento(s) de soporte para el inicio formal del proyecto ${this.projectId}`;
      this.mostrarMensaje = true;
      this.cargando = false;

      // Limpiar documentos después de enviar
      setTimeout(() => {
        this.documentos = [];
        this.mostrarMensaje = false;
      }, 4000);
    }, 2000);
  }
}
