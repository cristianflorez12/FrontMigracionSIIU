import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectContextService } from '../../services/project-context.service';

@Component({
  selector: 'app-documentos-soporte',
  standalone: true,
  imports: [],
  templateUrl: './documentos-soporte.component.html',
  styleUrl: './documentos-soporte.component.scss',
})
export class DocumentosSoporteComponent implements OnInit {
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
