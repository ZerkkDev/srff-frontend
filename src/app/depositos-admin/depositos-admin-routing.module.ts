import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositoComponent } from './deposito/deposito.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'deposito', component: DepositoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositosAdminRoutingModule { }
