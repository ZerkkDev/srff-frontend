import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositosAdminRoutingModule } from './depositos-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './lista/lista.component';
import { DepositoComponent } from './deposito/deposito.component';


@NgModule({
  declarations: [
    ListaComponent,
    DepositoComponent
  ],
  imports: [
    CommonModule,
    DepositosAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DepositosAdminModule { }
