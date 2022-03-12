import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecargasService } from 'src/app/shared/recargas.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css']
})
export class RecargaComponent implements OnInit {

  usuario: any

  recargas: any
  recarga: any

  descripcion: FormControl

  subscription: Subscription

  constructor(
    private clipboard: Clipboard,
    private afdb: AngularFireDatabase,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private recargasService: RecargasService
  ) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.subscription = this.recargasService.recargas.subscribe(
      lista => {
        this.recargas = lista?.filter(
          (x: any) => { return x.aprobado_por === this.usuario.id_usuario }
        )
        if (this.recargas?.length == 0) {
          this.router.navigate(['app/recargas-admin'])
        }
      }
    )
    this.descripcion = new FormControl(null, [Validators.required])
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  copy(id_jugador: string) {
    this.clipboard.copy(id_jugador);
    this.toastr.info('ID copiado: ' + id_jugador)
  }

  seleccionar(recarga: any, realizado: boolean) {
    this.descripcion.reset()
    this.recarga = recarga
    this.recarga.realizado = realizado
  }

  realizar() {
    if (!this.descripcion.valid) {
      this.toastr.error('Ingrese la referencia')
      return
    }
    this.recarga.descripcion = this.descripcion.value
    delete this.recarga.created_at
    this.spinner.show()
    this.recargasService.update(this.recarga, this.recarga.id).subscribe(
      (response: any) => {
        if (response === 1) {
          if (this.recarga.realizado) {
            this.toastr.success('Recarga realizada')
          } else {
            this.toastr.error('Recarga rechazada')
          }
          this.afdb.object('recargas/' + this.recarga.key).remove().then(
            () => this.recarga = null
          )
        }
        this.descripcion.reset()
        document.getElementById("closeModal")?.click()
        this.spinner.hide()
      },
      () => {
        document.getElementById("closeModal")?.click()
        this.spinner.hide()
      }
    )
  }

  cancelar(recarga: any) {
    this.afdb.object('recargas/' + recarga.key + '/aprobado_por').remove()
    this.afdb.object('recargas/' + recarga.key + '/aprobado').remove()
  }

}
