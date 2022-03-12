import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicidadRoutingModule } from './publicidad-routing.module';
import { PublicidadComponent } from './publicidad.component';


@NgModule({
  declarations: [
    PublicidadComponent
  ],
  imports: [
    CommonModule,
    PublicidadRoutingModule
  ]
})
export class PublicidadModule { }
