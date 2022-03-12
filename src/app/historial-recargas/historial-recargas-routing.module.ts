import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialRecargasComponent } from './historial-recargas.component';

const routes: Routes = [
  { path: '', component: HistorialRecargasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRecargasRoutingModule { }
