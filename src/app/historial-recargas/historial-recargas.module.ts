import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HistorialRecargasRoutingModule } from './historial-recargas-routing.module';
import { HistorialRecargasComponent } from './historial-recargas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistorialRecargasComponent
  ],
  imports: [
    CommonModule,
    HistorialRecargasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class HistorialRecargasModule { }
