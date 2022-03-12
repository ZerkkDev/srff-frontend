import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {

  private base = environment.base
  depositos: BehaviorSubject<any>
  usuario: any

  length!: number
  sound: HTMLAudioElement

  constructor(
    private http: HttpClient,
    private afdb: AngularFireDatabase,
    private auth: AuthService
  ) {
    this.depositos = new BehaviorSubject<any>(null)
    this.sound = new Audio('../../assets/sound/deposito.mp3')
    this.auth.usuario.subscribe(
      user => this.usuario = user
    )
    // this.recargas = this.realtimedb.list('recargas').valueChanges()
    this.afdb.list('depositos').snapshotChanges().subscribe(
      snapshots => {
        this.depositos.next(snapshots.map(
          snapshot => {
            let recarga: any = snapshot.payload.val()
            recarga['key'] = snapshot.key
            return recarga
          }
        ))
        if (this.usuario?.id_tipo === 1 || this.usuario?.id_tipo === 4) {
          if (snapshots.length > this.length) {
            this.sound.play()
          }
          this.length = snapshots.length
        }
      }
    )
  }

  private options() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  index() {
    return this.http.get(this.base + 'deposito', this.options())
  }

  store(request: any) {
    return this.http.post(this.base + 'deposito', request, this.options())
  }

  show(id: number) {
    return this.http.get(this.base + 'deposito/' + id, this.options())
  }

  update(request: any, id: number) {
    return this.http.put(this.base + 'deposito/' + id, request, this.options())
  }

  destroy(id: number) {
    return this.http.delete(this.base + 'deposito/' + id, this.options())
  }


  paginate(url: string, request: any) {
    return this.http.post(url, request, this.options())
  }

  comprobante(request: any) {
    return this.http.post(this.base + 'depositos/comprobante/check', request, this.options());
  }

  showByComprobante(request: any) {
    return this.http.post(this.base + 'depositos/comprobante', request, this.options());
  }

  showByDates(request: any) {
    return this.http.post(this.base + 'depositos/dates', request, this.options())
  }


}
