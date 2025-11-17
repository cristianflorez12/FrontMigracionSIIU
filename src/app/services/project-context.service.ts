import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectContextService {
  private projectIdSubject = new BehaviorSubject<string>('');
  public projectId$ = this.projectIdSubject.asObservable();

  setProjectId(id: string) {
    this.projectIdSubject.next(id);
  }

  getProjectId(): string {
    return this.projectIdSubject.getValue();
  }
}
