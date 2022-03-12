import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialDepositosComponent } from './historial-depositos.component';

const routes: Routes = [
  { path: '', component: HistorialDepositosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialDepositosRoutingModule { }
