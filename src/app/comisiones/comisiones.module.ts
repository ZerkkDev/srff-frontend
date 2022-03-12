import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ComisionesRoutingModule } from './comisiones-routing.module';
import { ComisionesComponent } from './comisiones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ComisionesComponent
  ],
  imports: [
    CommonModule,
    ComisionesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class ComisionesModule { }
