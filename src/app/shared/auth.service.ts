import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base = environment.base
  usuario: BehaviorSubject<any>

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.usuario = new BehaviorSubject<any>(null)
  }

  private options() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  register(request: any) {
    return this.http.post(this.base + 'register', request)
  }

  confirmacion(request: any) {
    return this.http.post(this.base + 'confirmacion', request)
  }

  auth(request: any) {
    return this.http.post(this.base + 'auth', request)
  }

  logout() {
    this.spinner.show()
    this.http.get(this.base + 'logout', this.options()).subscribe(
      response => {
        this.goToHome()
      },
      () => this.goToHome()
    )
  }

  goToHome() {
    localStorage.clear()
    this.usuario.next(null)
    this.router.navigate(['home'])
    this.spinner.hide()
  }

  access() {
    return this.http.get(this.base + 'access', this.options())
  }

  password(request: any) {
    return this.http.post(this.base + 'password', request);
  }

  passwordReset(request: any) {
    return this.http.post(this.base + 'password/reset', request);
  }

}
