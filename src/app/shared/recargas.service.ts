import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecargasService {

  private base = environment.base
  recargas: BehaviorSubject<any>
  usuario: any

  length!: number
  sound: HTMLAudioElement

  constructor(
    private http: HttpClient,
    private afdb: AngularFireDatabase,
    private auth: AuthService
  ) {
    this.recargas = new BehaviorSubject<any>(null)
    this.sound = new Audio('../../assets/sound/recarga.mp3')
    // this.recargas = this.realtimedb.list('recargas').valueChanges()
    this.auth.usuario.subscribe(
      user => this.usuario = user
    )
    this.afdb.list('recargas').snapshotChanges().subscribe(
      snapshots => {
        this.recargas.next(snapshots.map(
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
    return this.http.get(this.base + 'recarga', this.options())
  }

  store(request: any) {
    return this.http.post(this.base + 'recarga', request, this.options())
  }

  show(id: number) {
    return this.http.get(this.base + 'recarga/' + id, this.options())
  }

  update(request: any, id: number) {
    return this.http.put(this.base + 'recarga/' + id, request, this.options())
  }

  destroy(id: number) {
    return this.http.delete(this.base + 'recarga/' + id, this.options())
  }


  recargar(request: any) {
    return this.http.post(this.base + 'recargar', request, this.options())
  }

  showByDates(request: any) {
    return this.http.post(this.base + 'recargas/dates', request, this.options())
  }

  showByIdJugador(request: any) {
    return this.http.post(this.base + 'recargas/jugador', request, this.options())
  }

  paginate(request: any, url: string) {
    request.paginate = 'paginate'
    return this.http.post(url, request, this.options())
  }

  calcularGanancia(request: any) {
    return this.http.post(this.base + 'recargas/ganancia', request, this.options())
  }

  comisiones(request: any) {
    return this.http.post(this.base + 'recargas/comisiones', request, this.options())
  }

  contabilidad(request: any) {
    return this.http.post(this.base + 'recargas/contabilidad', request, this.options())
  }

}
