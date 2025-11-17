import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { jsPDF } from 'jspdf';

interface Proyecto {
  id?: string;
  nombre?: string;
  codigo?: string;
  descripcion?: string;
  fechaInicio?: string;
  fechaFin?: string;
  duracion?: number;
  duracionUnidad?: string;
  responsable?: string;
  institucion?: string;
  observaciones?: string;
}

@Component({
  selector: 'app-generar-acta-inicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule],
  templateUrl: './generar-acta-inicio.component.html',
  styleUrl: './generar-acta-inicio.component.scss',
})
export class GenerarActaInicioComponent {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);

  @ViewChild('pdfContent') pdfContent!: ElementRef;

  isLoading = false;
  isGenerating = false;
  errorMessage = '';
  usandoMock = false;
  proyecto: Proyecto | null = null;
  projectId = '1';
  now = new Date();

  private mockProyecto: Proyecto = {
    id: '1',
    nombre: 'Proyecto Integrador II',
    codigo: 'PI-2025-001',
    descripcion:
      'El Proyecto Integrador II es una iniciativa académica diseñada para integrar los conocimientos adquiridos durante el semestre en una aplicación práctica y significativa. Este proyecto busca desarrollar competencias en desarrollo de software, gestión de proyectos y trabajo en equipo.',
    fechaInicio: '2025-01-15',
    fechaFin: '2025-06-30',
    duracion: 24,
    duracionUnidad: 'semanas',
    responsable: 'Dr. Juan Pérez García',
    institucion: 'Universidad de Antioquia',
    observaciones: 'Proyecto prioritario para el semestre',
  };

  async generarActaInicio() {
    try {
      this.isLoading = true;
      this.errorMessage = '';
      this.isGenerating = true;
      this.usandoMock = false;
      this.now = new Date();

      // Intentar cargar información del proyecto
      try {
        this.proyecto =
          (await this.apiService
            .get<Proyecto>(`/api/proyectos/${this.projectId}`)
            .toPromise()) || null;
      } catch {
        // Si falla la API, usar datos de prueba
        console.warn('API no disponible, usando datos de prueba');
        this.proyecto = this.mockProyecto;
        this.usandoMock = true;
      }

      if (!this.proyecto) {
        throw new Error('No se pudo cargar la información del proyecto');
      }

      // Esperar a que el template se renderice
      setTimeout(() => {
        this.generarPDF();
      }, 1000);
    } catch (error: unknown) {
      console.error('Error al cargar el proyecto:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.errorMessage =
        'Error al cargar la información del proyecto: ' + errorMessage;
      this.isGenerating = false;
    } finally {
      this.isLoading = false;
    }
  }

  private async generarPDF() {
    try {
      if (!this.proyecto) {
        throw new Error('No hay datos del proyecto para generar PDF');
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let currentY = 20;

      // Encabezado
      pdf.setFontSize(20);
      pdf.setTextColor(0, 0, 0);
      pdf.text('ACTA DE INICIO FORMAL', pageWidth / 2, currentY, {
        align: 'center',
      });
      currentY += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        'Documento oficial que certifica el inicio formal del proyecto',
        pageWidth / 2,
        currentY,
        { align: 'center' }
      );
      currentY += 15;

      // Línea separadora
      pdf.setDrawColor(0, 0, 200);
      pdf.line(20, currentY, pageWidth - 20, currentY);
      currentY += 10;

      // Sección de información
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 150);
      pdf.text('INFORMACIÓN DEL PROYECTO', 20, currentY);
      currentY += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      // Datos del proyecto
      const datos = [
        {
          label: 'Nombre del Proyecto:',
          value: this.proyecto.nombre || '',
        },
        {
          label: 'Código del Proyecto:',
          value: this.proyecto.codigo || '',
        },
        {
          label: 'Descripción:',
          value: this.proyecto.descripcion || '',
        },
        {
          label: 'Fecha de Inicio:',
          value: this.proyecto.fechaInicio || '',
        },
        {
          label: 'Fecha de Finalización:',
          value: this.proyecto.fechaFin || '',
        },
        {
          label: 'Duración:',
          value: `${this.proyecto.duracion} ${
            this.proyecto.duracionUnidad || ''
          }`,
        },
        {
          label: 'Institución:',
          value: this.proyecto.institucion || '',
        },
        {
          label: 'Responsable:',
          value: this.proyecto.responsable || '',
        },
      ];

      for (const dato of datos) {
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = 20;
        }

        pdf.setFont('helvetica', 'bold');
        pdf.text(dato.label, 20, currentY);
        pdf.setFont('helvetica', 'normal');

        const textWidth = pageWidth - 100;
        const splitText = pdf.splitTextToSize(dato.value, textWidth);
        pdf.text(splitText, 80, currentY);

        currentY += splitText.length * 7 + 3;
      }

      if (this.proyecto.observaciones) {
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = 20;
        }

        pdf.setFont('helvetica', 'bold');
        pdf.text('Observaciones:', 20, currentY);
        pdf.setFont('helvetica', 'normal');

        const textWidth = pageWidth - 40;
        const splitText = pdf.splitTextToSize(
          this.proyecto.observaciones,
          textWidth
        );
        currentY += 7;
        pdf.text(splitText, 20, currentY);
        currentY += splitText.length * 7 + 5;
      }

      // Sección de certificación
      if (currentY > pageHeight - 60) {
        pdf.addPage();
        currentY = 20;
      }

      currentY += 10;
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      const certificacionText = pdf.splitTextToSize(
        'Por medio de la presente se certifica que el proyecto mencionado anteriormente ha sido oficialmente iniciado el día de hoy. Se autoriza a todos los participantes del proyecto para comenzar las actividades programadas de conformidad con el plan establecido.',
        pageWidth - 40
      );
      pdf.text(certificacionText, 20, currentY);
      currentY += certificacionText.length * 7 + 15;

      // Espacios para firmas
      const firmas = [
        'Responsable del Proyecto',
        'Coordinador Académico',
        'Director Institucional',
      ];

      currentY += 15;
      const firmaX = [25, 85, 145];

      for (let i = 0; i < firmas.length; i++) {
        pdf.line(firmaX[i], currentY + 25, firmaX[i] + 30, currentY + 25);
        pdf.setFontSize(9);
        pdf.text(firmas[i], firmaX[i], currentY + 30, { align: 'center' });
      }

      // Pie de página
      const footerY = pageHeight - 15;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      const fechaGen = new Date().toLocaleDateString('es-CO');
      const horaGen = new Date().toLocaleTimeString('es-CO');
      pdf.text(
        `Documento generado automáticamente el ${fechaGen} a las ${horaGen}`,
        pageWidth / 2,
        footerY,
        { align: 'center' }
      );
      pdf.text(
        'Sistema de Información Institucional Universitario (SIIU)',
        pageWidth / 2,
        footerY + 5,
        { align: 'center' }
      );

      // Descargar PDF
      const nombreProyecto =
        this.proyecto?.nombre?.replace(/\s+/g, '_') || 'acta_inicio';
      pdf.save(`Acta_Inicio_${nombreProyecto}.pdf`);

      this.isGenerating = false;
    } catch (error: unknown) {
      console.error('Error al generar PDF:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.errorMessage = 'Error al generar el PDF: ' + errorMessage;
      this.isGenerating = false;
    }
  }
}
