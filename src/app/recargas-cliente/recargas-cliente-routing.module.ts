import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecargasClienteComponent } from './recargas-cliente.component';

const routes: Routes = [
  { path: '', component: RecargasClienteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecargasClienteRoutingModule { }
