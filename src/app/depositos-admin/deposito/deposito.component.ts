import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DepositoService } from 'src/app/shared/deposito.service';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  usuario: any

  depositos: any
  deposito: any

  razon: FormControl
  realizado!: boolean

  subscription: Subscription

  constructor(
    private afdb: AngularFireDatabase,
    private afs: AngularFireStorage,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private depositoService: DepositoService
  ) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.subscription = this.depositoService.depositos.subscribe(
      lista => {
        this.depositos = lista?.filter(
          (x: any) => { return x.aprobado_por === this.usuario.id_usuario }
        )
        if (this.depositos?.length == 0) {
          this.router.navigate(['app/depositos-admin'])
        }
      }
    )
    this.razon = new FormControl(null, [Validators.required])
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  seleccionar(recarga: any, realizado: boolean) {
    this.razon.reset()
    this.deposito = recarga
    this.realizado = realizado
  }

  realizar() {
    let deposito = {
      id_usuario: this.deposito.id_usuario,
      valor: this.deposito.valor,
      banco: this.deposito.banco,
      comprobante: this.deposito.comprobante,
      realizado: this.realizado,
      razon: this.razon.value,
      aprobado_por: this.usuario.id_usuario
    }
    this.spinner.show()
    this.depositoService.store(deposito).subscribe(
      () => {
        if (this.realizado) {
          this.toastr.success('Deposito realizado')
        } else {
          this.toastr.error('Deposito rechazado')
        }
        this.afdb.object('depositos/' + this.deposito.key).remove()
        this.afs.ref(this.deposito.image_path).delete()
        this.razon.reset()
        this.deposito = null
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
    this.afdb.object('depositos/' + recarga.key + '/aprobado_por').remove()
  }

  setSrc(image_path: string) {
    this.afs.ref(image_path).getDownloadURL().subscribe(
      src => window.open(src),
      () => this.toastr.error('No se pudo cargar la imagen')
    )
  }

}
