import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private base = environment.base
  avisos: BehaviorSubject<any>
  aviso: BehaviorSubject<any>

  constructor(
    private http: HttpClient
  ) {
    this.avisos = new BehaviorSubject<any>(null)
    this.aviso = new BehaviorSubject<any>(null)
    // this.http.get(this.base + 'aviso', this.options()).subscribe(
    //   response => this.avisos.next(response)
    // )
  }

  private options() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  index() {
    return this.http.get(this.base + 'aviso', this.options())
  }

  store(request: any) {
    return this.http.post(this.base + 'aviso', request, this.options())
  }

  show(id: number) {
    return this.http.get(this.base + 'aviso/' + id, this.options())
  }

  update(request: any, id: number) {
    return this.http.put(this.base + 'aviso/' + id, request, this.options())
  }

  destroy(id: number) {
    return this.http.delete(this.base + 'aviso/' + id, this.options())
  }


  showActive() {
    return this.http.get(this.base + 'avisos/active')
  }
}
