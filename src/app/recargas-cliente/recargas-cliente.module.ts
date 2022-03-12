import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RecargasClienteRoutingModule } from './recargas-cliente-routing.module';
import { RecargasClienteComponent } from './recargas-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RecargasClienteComponent
  ],
  imports: [
    CommonModule,
    RecargasClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class RecargasClienteModule { }
