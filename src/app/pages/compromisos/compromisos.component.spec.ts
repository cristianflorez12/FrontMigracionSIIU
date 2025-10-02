import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromisosComponent } from './compromisos.component';

describe('CompromisosComponent', () => {
  let component: CompromisosComponent;
  let fixture: ComponentFixture<CompromisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompromisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompromisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
