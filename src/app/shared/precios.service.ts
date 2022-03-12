import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {

  private base = environment.base
  precios: BehaviorSubject<any>

  constructor(private http: HttpClient) {
    this.precios = new BehaviorSubject<any>(null)
  }

  private options() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  index() {
    return this.http.get(this.base + 'precio', this.options())
  }

  store(request: any) {
    return this.http.post(this.base + 'precio', request, this.options())
  }

  show(id: number) {
    return this.http.get(this.base + 'precio/' + id, this.options())
  }

  update(request: any, id: number) {
    return this.http.put(this.base + 'precio/' + id, request, this.options())
  }

  destroy(id: number) {
    return this.http.delete(this.base + 'precio/' + id, this.options())
  }


  preciosActivos() {
    return this.http.get(this.base + 'precios/activos', this.options())
  }

}
