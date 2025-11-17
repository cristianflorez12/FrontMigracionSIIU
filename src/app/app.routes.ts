import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/proyectos/proyectos.component').then(
        (m) => m.ProyectosComponent
      ),
  },
  {
    path: 'etapas',
    loadComponent: () =>
      import('./pages/etapas/etapas.component').then((m) => m.EtapasComponent),
  },
  {
    path: 'compromisos',
    loadComponent: () =>
      import('./pages/compromisos/compromisos.component').then(
        (m) => m.CompromisosComponent
      ),
  },
  {
    path: 'participantes',
    loadComponent: () =>
      import('./pages/participantes/participantes.component').then(
        (m) => m.ParticipantesComponent
      ),
  },
  {
    path: 'empleados-siiu',
    loadComponent: () =>
      import('./pages/empleados-siiu/empleados-siiu.component').then(
        (m) => m.EmpleadosSIIUComponent
      ),
  },
  {
    path: 'inicio-formal',
    loadComponent: () =>
      import('./pages/inicio-formal/inicio-formal.component').then(
        (m) => m.InicioFormalComponent
      ),
  },
  {
    path: 'generar-acta-inicio',
    loadComponent: () =>
      import('./pages/generar-acta-inicio/generar-acta-inicio.component').then(
        (m) => m.GenerarActaInicioComponent
      ),
  },
  {
    path: 'documentos-soporte',
    loadComponent: () =>
      import('./pages/documentos-soporte/documentos-soporte.component').then(
        (m) => m.DocumentosSoporteComponent
      ),
  },
  {
    path: 'cerrar-inicio-formal',
    loadComponent: () =>
      import(
        './pages/cerrar-inicio-formal/cerrar-inicio-formal.component'
      ).then((m) => m.CerrarInicioFormalComponent),
  },
];
