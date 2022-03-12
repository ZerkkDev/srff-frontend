import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialRecargasComponent } from './historial-recargas.component';

describe('HistorialRecargasComponent', () => {
  let component: HistorialRecargasComponent;
  let fixture: ComponentFixture<HistorialRecargasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialRecargasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialRecargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
