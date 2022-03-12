import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/shared/auth.service';
import { RecargasService } from 'src/app/shared/recargas.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuario: any
  recargas: any

  disable: boolean

  subscription: Subscription

  constructor(
    private clipboard: Clipboard,
    private router: Router,
    private afdb: AngularFireDatabase,
    private toastr: ToastrService,
    private auth: AuthService,
    private recargasService: RecargasService
  ) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.subscription = this.recargasService.recargas.subscribe(
      lista => {
        if (this.usuario?.id_tipo == 1) {
          this.recargas = lista
        } else {
          this.recargas = lista?.filter(
            (x: any) => { return x.aprobado_por ? false : true }
          )
        }
      }
    )
    this.disable = false
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  seleccionar(recarga: any) {
    this.disable = true
    this.afdb.object('recargas/' + recarga.key).update({
      aprobado_por: this.usuario.id_usuario,
      aprobado: this.usuario.nombre
    }).then(
      () => {
        this.router.navigate(['app/recargas-admin/recarga']).then(
          () => {
            this.clipboard.copy(recarga.id_jugador);
            this.toastr.info('ID copiado: ' + recarga.id_jugador)
          }
        )
        this.disable = false
      }
    )
  }

}
