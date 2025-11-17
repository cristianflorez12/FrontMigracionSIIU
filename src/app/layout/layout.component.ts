import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterModule,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  projectId = '';

  get showStepper(): boolean {
    return this.router.url !== '/';
  }

  ngOnInit(): void {
    // Escuchar cambios de navegación
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.extractProjectId();
      });

    // Extraer projectId inicial
    this.extractProjectId();
  }

  private extractProjectId(): void {
    // Buscar projectId en la ruta actual y sus ancestros
    let route = this.route;
    while (route) {
      const params = route.snapshot.params;
      if (params['projectId']) {
        this.projectId = params['projectId'];
        return;
      }
      route = route.firstChild as ActivatedRoute;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
