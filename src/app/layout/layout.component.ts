import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

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
export class LayoutComponent {
  private router = inject(Router);

  get showStepper(): boolean {
    return this.router.url !== '/';
  }
}
