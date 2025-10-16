import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      //{ path: 'about', component: AboutComponent },
    ],
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
];
