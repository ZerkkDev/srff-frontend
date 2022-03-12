import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base = environment.base
  page: BehaviorSubject<any>

  constructor(
    private http: HttpClient
  ) {
    this.page = new BehaviorSubject<any>(null)
  }

  private options() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  index() {
    return this.http.get(this.base + 'user', this.options())
  }

  store(request: any) {
    return this.http.post(this.base + 'user', request, this.options())
  }

  show(id: number) {
    return this.http.get(this.base + 'user/' + id, this.options())
  }

  update(request: any, id: number) {
    return this.http.put(this.base + 'user/' + id, request, this.options())
  }

  destroy(id: number) {
    return this.http.delete(this.base + 'user/' + id, this.options())
  }



  paginate(url: string, request: any) {
    return this.http.post(url, request, this.options())
  }

  getSaldo() {
    return this.http.get(this.base + 'users/saldo', this.options())
  }

  showByNombre(request: any) {
    return this.http.post(this.base + 'users/nombre', request, this.options())
  }

  showByGroup(request: any) {
    return this.http.post(this.base + 'users/group', request, this.options())
  }

  empleados() {
    return this.http.get(this.base + 'users/empleados', this.options())
  }

  cambioContrasenia(request: any) {
    return this.http.post(this.base + 'users/cambio/contrasenia', request, this.options())
  }

  loadusers(request: any) {
    return this.http.post(this.base + 'loadusers', request)
  }

}
