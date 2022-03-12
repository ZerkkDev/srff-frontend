import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecargasAdminRoutingModule } from './recargas-admin-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaComponent } from './lista/lista.component';
import { RecargaComponent } from './recarga/recarga.component';


@NgModule({
  declarations: [
    ListaComponent,
    RecargaComponent
  ],
  imports: [
    CommonModule,
    RecargasAdminRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecargasAdminModule { }
