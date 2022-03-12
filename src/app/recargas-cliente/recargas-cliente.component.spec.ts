import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargasClienteComponent } from './recargas-cliente.component';

describe('RecargasClienteComponent', () => {
  let component: RecargasClienteComponent;
  let fixture: ComponentFixture<RecargasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecargasClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
