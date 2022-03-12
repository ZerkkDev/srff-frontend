import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  usuario: any

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
  ) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.usuario) {
      return true
    } else {
      try {
        this.spinner.show()
        let response = await this.auth.access().toPromise()
        if (response) {
          this.auth.usuario.next(response)
          this.spinner.hide()
          return true
        }
      } catch (error) {
      }
      this.spinner.hide()
      this.router.navigate(['home'])
      return false
    }
  }

}
