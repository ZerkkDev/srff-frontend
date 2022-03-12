import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosIndexComponent } from './avisos-index.component';

describe('AvisosIndexComponent', () => {
  let component: AvisosIndexComponent;
  let fixture: ComponentFixture<AvisosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisosIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
