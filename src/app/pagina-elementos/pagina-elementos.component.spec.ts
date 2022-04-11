import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaElementosComponent } from './pagina-elementos.component';

describe('PaginaElementosComponent', () => {
  let component: PaginaElementosComponent;
  let fixture: ComponentFixture<PaginaElementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaElementosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
