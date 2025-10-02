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
];
