import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from '../guards/guard.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: 'app', component: MainComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'avisos',
        loadChildren: () => import('../avisos/avisos.module').then(m => m.AvisosModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'recargas',
        loadChildren: () => import('../recargas-cliente/recargas-cliente.module').then(m => m.RecargasClienteModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'recargas-admin',
        loadChildren: () => import('../recargas-admin/recargas-admin.module').then(m => m.RecargasAdminModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'depositos',
        loadChildren: () => import('../depositos-cliente/depositos-cliente.module').then(m => m.DepositosClienteModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'depositos-admin',
        loadChildren: () => import('../depositos-admin/depositos-admin.module').then(m => m.DepositosAdminModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'historial-recargas',
        loadChildren: () => import('../historial-recargas/historial-recargas.module').then(m => m.HistorialRecargasModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'historial-depositos',
        loadChildren: () => import('../historial-depositos/historial-depositos.module').then(m => m.HistorialDepositosModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'comisiones',
        loadChildren: () => import('../comisiones/comisiones.module').then(m => m.ComisionesModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'publicidad',
        loadChildren: () => import('../publicidad/publicidad.module').then(m => m.PublicidadModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'precios',
        loadChildren: () => import('../precios/precios.module').then(m => m.PreciosModule),
        canActivate: [GuardGuard]
      },
      {
        path: 'contabilidad',
        loadChildren: () => import('../contabilidad/contabilidad.module').then(m => m.ContabilidadModule),
        canActivate: [GuardGuard]
      },
    ]
  },
  { path: '**', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
