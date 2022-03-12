import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDepositosComponent } from './historial-depositos.component';

describe('HistorialDepositosComponent', () => {
  let component: HistorialDepositosComponent;
  let fixture: ComponentFixture<HistorialDepositosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialDepositosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialDepositosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
