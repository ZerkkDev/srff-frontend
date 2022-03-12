import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisosRoutingModule } from './avisos-routing.module';
import { AvisosIndexComponent } from './avisos-index/avisos-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AvisosIndexComponent
  ],
  imports: [
    CommonModule,
    AvisosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AvisosModule { }
