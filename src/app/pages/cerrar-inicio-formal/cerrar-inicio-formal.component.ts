import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectContextService } from '../../services/project-context.service';

@Component({
  selector: 'app-cerrar-inicio-formal',
  standalone: true,
  imports: [],
  templateUrl: './cerrar-inicio-formal.component.html',
  styleUrl: './cerrar-inicio-formal.component.scss',
})
export class CerrarInicioFormalComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectContext = inject(ProjectContextService);

  projectId: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['projectId'] || '1';
      this.projectContext.setProjectId(this.projectId);
    });
  }
}
