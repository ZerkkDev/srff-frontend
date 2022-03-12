import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordComponent } from './password/password.component';
import { ResetComponent } from './reset/reset.component';


@NgModule({
  declarations: [
    PasswordComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResetPasswordModule { }
