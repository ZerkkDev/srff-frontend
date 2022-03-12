import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositosClienteComponent } from './depositos-cliente.component';

describe('DepositosClienteComponent', () => {
  let component: DepositosClienteComponent;
  let fixture: ComponentFixture<DepositosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
