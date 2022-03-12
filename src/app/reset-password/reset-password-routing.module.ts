import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  { path: '', component: PasswordComponent },
  { path: 'reset/:token', component: ResetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
