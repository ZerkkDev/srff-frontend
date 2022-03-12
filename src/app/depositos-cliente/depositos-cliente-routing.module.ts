import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositosClienteComponent } from './depositos-cliente.component';

const routes: Routes = [
  { path: '', component: DepositosClienteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositosClienteRoutingModule { }
