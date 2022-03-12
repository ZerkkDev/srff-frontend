import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  usuario: any

  constructor(
    private auth: AuthService,
  ) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let path = route.routeConfig?.path
    if (this.usuario?.modules.find((x: any) => x.path === path)) {
      return true
    }
    return false;
  }

}
