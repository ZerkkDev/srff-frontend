import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositosClienteRoutingModule } from './depositos-cliente-routing.module';
import { DepositosClienteComponent } from './depositos-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepositosClienteComponent
  ],
  imports: [
    CommonModule,
    DepositosClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DepositosClienteModule { }
