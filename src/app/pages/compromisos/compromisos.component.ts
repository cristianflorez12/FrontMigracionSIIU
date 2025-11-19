import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ProjectContextService } from '../../services/project-context.service';
import { ZardAlertComponent } from '../../shared/components/alert/alert.component';

export interface Compromiso {
  id?: number;
  compromiso?: string;
  descripcion: string;
  notas?: string;
  fechaEstimada?: string;
}

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
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './compromisos.component.html',
  styleUrl: './compromisos.component.scss',
})
export class CompromisosComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);

  displayedColumns: string[] = ['descripcion', 'acciones', 'notas'];

  dataSource: Compromiso[] = [];
  compromisosForm!: FormGroup;
  isLoading = true;
  errorMessage = '';
  usandoMock = false;
  projectId: string = '';
  mensajeAyuda = '';
  mensajeInfo = '';

  private mockCompromisos: Compromiso[] = [
    {
      id: 1,
      compromiso: 'Compromiso 1',
      descripcion: 'Descripción del compromiso 1',
      notas: 'Notas del compromiso 1',
    },
    {
      id: 2,
      compromiso: 'Compromiso 2',
      descripcion: 'Descripción del compromiso 2',
      notas: 'Notas del compromiso 2',
    },
    {
      id: 3,
      compromiso: 'Compromiso 3',
      descripcion: 'Descripción del compromiso 3',
      notas: 'Notas del compromiso 3',
    },
  ];

  ngOnInit(): void {
    console.log('🚀 Inicializando componente...');
    
    this.compromisosForm = this.fb.group({
      compromisos: this.fb.array([]),
    });

    this.route.params.subscribe((params) => {
      // El parámetro de ruta es 'codigo' según las rutas definidas
      this.projectId = params['codigo'] || '';
      console.log('📋 Project ID (Código del Proyecto):', this.projectId);
      
      if (!this.projectId) {
        console.error('❌ No se encontró el código del proyecto en la ruta');
        this.errorMessage = 'No se encontró el código del proyecto';
        this.isLoading = false;
        return;
      }
      
      this.projectContext.setProjectId(this.projectId);
      
      this.cargarMensajes();
      this.cargarCompromisos();
    });
  }

  private cargarMensajes(): void {
    console.log('📨 Cargando mensajes...');
    
    // Cargar mensaje de ayuda
    this.apiService.get<string>('/api/compromisos/mensajes/ayuda').subscribe({
      next: (mensaje) => {
        console.log('✅ Mensaje de ayuda cargado:', mensaje);
        this.mensajeAyuda = mensaje;
      },
      error: (error) => {
        console.warn('⚠️ No se pudo cargar el mensaje de ayuda:', error);
        this.mensajeAyuda = 'Edite el compromiso para agregar la fecha estimada de cumplimiento y las notas correspondientes';
      },
    });

    // Cargar mensaje de información
    this.apiService.get<string>('/api/compromisos/mensajes/info').subscribe({
      next: (mensaje) => {
        console.log('✅ Mensaje de info cargado:', mensaje);
        this.mensajeInfo = mensaje;
      },
      error: (error) => {
        console.warn('⚠️ No se pudo cargar el mensaje de información:', error);
        this.mensajeInfo = 'Los siguientes compromisos fueron definidos previamente en la matrícula del proyecto';
      },
    });
  }

  private cargarCompromisos(): void {
    console.log('🔄 Iniciando carga de compromisos...');
    this.isLoading = true;
    this.errorMessage = '';
    this.usandoMock = false;

    const url = `/api/compromisos/${this.projectId}`;
    console.log('🌐 URL de API:', url);

    this.apiService
      .get<Compromiso[]>(url)
      .subscribe({
        next: (compromisos) => {
          console.log('✅ Compromisos cargados desde API:', compromisos);
          console.log('📊 Cantidad de compromisos:', compromisos?.length || 0);
          
          if (!compromisos || compromisos.length === 0) {
            console.warn('⚠️ La API devolvió un array vacío');
            this.usarDatosMock();
            return;
          }
          
          this.dataSource = compromisos;
          this.setFormArrayFromData(compromisos);
          this.isLoading = false;
          this.usandoMock = false;
          
          console.log('✅ FormArray después de setear:', this.compromisosArray.length);
          console.log('✅ DataSource después de setear:', this.dataSource.length);
          
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('❌ Error al cargar los compromisos:', error);
          console.error('❌ Error completo:', JSON.stringify(error, null, 2));
          this.usarDatosMock();
        },
      });
  }

  private usarDatosMock(): void {
    console.warn('🔧 Cargando datos de prueba (mock)...');
    this.dataSource = this.mockCompromisos;
    this.usandoMock = true;
    this.isLoading = false;
    this.errorMessage = 'No se pudo conectar al servidor. Mostrando datos de prueba.';
    this.setFormArrayFromData(this.mockCompromisos);
    
    console.log('✅ Mock cargado - FormArray:', this.compromisosArray.length);
    console.log('✅ Mock cargado - DataSource:', this.dataSource.length);
    
    this.cdr.detectChanges();
  }

  private createCompromisoGroup(item: Partial<Compromiso> = {}): FormGroup {
    const group = this.fb.group({
      id: [item.id || null],
      compromiso: [item.compromiso || ''],
      descripcion: [item.descripcion || ''],
      notas: [item.notas || ''],
      fechaEstimada: [item.fechaEstimada || ''],
    });
    
    console.log('🔨 FormGroup creado:', group.value);
    return group;
  }

  private setFormArrayFromData(data: Compromiso[]): void {
    console.log('🔧 Seteando FormArray con data:', data);
    const fa = this.compromisosForm.get('compromisos') as FormArray;
    fa.clear();
    
    if (!data || data.length === 0) {
      console.warn('⚠️ No hay datos para setear en FormArray');
      return;
    }
    
    data.forEach((item, index) => {
      console.log(`➕ Agregando item ${index}:`, item);
      fa.push(this.createCompromisoGroup(item));
    });
    
    console.log('✅ FormArray seteado. Controles:', fa.length);
    console.log('✅ Valores del FormArray:', fa.value);
    
    this.cdr.detectChanges();
  }

  editarCompromiso(compromiso: Compromiso): void {
    console.log('✏️ Editando compromiso:', compromiso);
    
    if (!compromiso.id) {
      console.error('❌ El compromiso no tiene ID');
      return;
    }

    const body = {
      fechaEstimada: compromiso.fechaEstimada,
      notas: compromiso.notas,
    };

    console.log('📤 Enviando actualización:', body);

    this.apiService
      .put<Compromiso>(`/api/compromisos/${compromiso.id}`, body)
      .subscribe({
        next: (response) => {
          console.log('✅ Compromiso actualizado:', response);
          this.cargarCompromisos();
        },
        error: (err: Error) => {
          console.error('❌ Error al actualizar compromiso:', err);
          this.errorMessage = 'Error al actualizar el compromiso';
        },
      });
  }

  onSubmit(): void {
    console.log('💾 Guardando formulario...');
    console.log('📋 Estado del formulario:', this.compromisosForm.value);
    
    if (this.compromisosForm.invalid) {
      console.warn('⚠️ Formulario inválido');
      this.compromisosForm.markAllAsTouched();
      return;
    }

    const compromisos = this.compromisosForm.value.compromisos as Compromiso[];
    console.log('📤 Compromisos a guardar:', compromisos);
    
    if (!compromisos || compromisos.length === 0) {
      console.warn('⚠️ No hay compromisos para guardar');
      return;
    }
    
    // Actualizar cada compromiso individualmente
    let actualizacionesCompletadas = 0;
    const totalActualizaciones = compromisos.length;

    compromisos.forEach((compromiso, index) => {
      if (compromiso.id) {
        console.log(`📤 Actualizando compromiso ${index + 1}/${totalActualizaciones}:`, compromiso.id);
        
        this.apiService
          .put<Compromiso>(`/api/compromisos/${compromiso.id}`, {
            fechaEstimada: compromiso.fechaEstimada,
            notas: compromiso.notas,
          })
          .subscribe({
            next: (response) => {
              console.log(`✅ Compromiso ${index + 1} guardado:`, response);
              actualizacionesCompletadas++;
              
              if (actualizacionesCompletadas === totalActualizaciones) {
                console.log('✅ Todas las actualizaciones completadas');
                this.cargarCompromisos();
              }
            },
            error: (err: Error) => {
              console.error(`❌ Error guardando compromiso ${index + 1}:`, err);
              this.errorMessage = 'Error al guardar algunos compromisos';
            },
          });
      } else {
        console.warn(`⚠️ Compromiso ${index + 1} sin ID, se omite`);
      }
    });
  }

  get compromisosArray() {
    return this.compromisosForm.get('compromisos') as FormArray;
  }
}