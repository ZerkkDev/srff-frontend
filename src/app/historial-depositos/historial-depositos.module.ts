import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HistorialDepositosRoutingModule } from './historial-depositos-routing.module';
import { HistorialDepositosComponent } from './historial-depositos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistorialDepositosComponent
  ],
  imports: [
    CommonModule,
    HistorialDepositosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class HistorialDepositosModule { }
