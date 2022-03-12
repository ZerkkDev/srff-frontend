import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { RecargaComponent } from './recarga/recarga.component';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'recarga', component: RecargaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecargasAdminRoutingModule { }
