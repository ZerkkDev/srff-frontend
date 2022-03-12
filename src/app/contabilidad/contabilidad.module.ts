import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ContabilidadRoutingModule } from './contabilidad-routing.module';
import { ContabilidadComponent } from './contabilidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContabilidadComponent
  ],
  imports: [
    CommonModule,
    ContabilidadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class ContabilidadModule { }
