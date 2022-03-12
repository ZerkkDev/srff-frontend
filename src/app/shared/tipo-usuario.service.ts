import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  private base = environment.base
  tipos: BehaviorSubject<any>

  constructor(private http: HttpClient) {
    this.tipos = new BehaviorSubject<any>(null)
  }

  private options() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  index() {
    return this.http.get(this.base + 'tipo', this.options())
  }

  store(request: any) {
    return this.http.post(this.base + 'tipo', request, this.options())
  }

  show(id: number) {
    return this.http.get(this.base + 'tipo/' + id, this.options())
  }

  update(request: any, id: number) {
    return this.http.put(this.base + 'tipo/' + id, request, this.options())
  }

  destroy(id: number) {
    return this.http.delete(this.base + 'tipo/' + id, this.options())
  }
}
