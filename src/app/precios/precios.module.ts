import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreciosRoutingModule } from './precios-routing.module';
import { PreciosComponent } from './precios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PreciosComponent
  ],
  imports: [
    CommonModule,
    PreciosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PreciosModule { }
