import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { PreciosService } from '../shared/precios.service';
import { RecargasService } from '../shared/recargas.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-recargas-cliente',
  templateUrl: './recargas-cliente.component.html',
  styleUrls: ['./recargas-cliente.component.css']
})
export class RecargasClienteComponent implements OnInit {

  usuario: any

  precios: any
  precio: any
  id_jugador: FormControl

  disable: boolean

  constructor(
    private afdb: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private auth: AuthService,
    private userService: UserService,
    private preciosService: PreciosService,
    private recargasService: RecargasService
  ) {
    this.preciosService.precios.subscribe(
      precios => {
        if (precios) {
          this.precios = precios?.map(
            (x: any) => {
              x.active = false
              return x
            }
          )
        } else {
          this.preciosService.preciosActivos().subscribe(
            response => this.preciosService.precios.next(response)
          )
        }
      }
    )
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.disable = false
    this.id_jugador = new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
      Validators.pattern("^[0-9]*$"),
    ])
  }

  ngOnInit(): void {
  }

  seleccionarPrecio(precio: any) {
    this.precios.map(
      (x: any) => {
        x.active = false
        if (x.id_precio === precio.id_precio) {
          x.active = true
        }
      }
    )
    this.precio = precio
  }

  recargar() {
    if (!this.id_jugador.valid) {
      if (this.id_jugador.errors?.required) {
        this.toastr.error('Ingrese el ID del jugador')
      }
      if (this.id_jugador.errors?.minlength) {
        this.toastr.error('El ID debe tener al menos 8 números')
      }
      if (this.id_jugador.errors?.maxlength) {
        this.toastr.error('El ID no debe tener mas de 15 números')
      }
      if (this.id_jugador.errors?.pattern) {
        this.toastr.error('ID no valido')
      }
      return
    }
    if (!this.precio) {
      this.toastr.error('Selecione el precio')
      return
    }
    let recarga = {
      id_jugador: this.id_jugador.value,
      id_usuario: this.usuario.id_usuario,
      precio: this.precio.prepago,
      realizado: 2,
      id_precio: this.precio.id_precio
    }
    this.spinner.show()
    this.recargasService.store(recarga).subscribe(
      (response: any) => {
        if (response) {
          this.afdb.list('recargas').push(response.recarga).then(
            () => {
              this.id_jugador.reset()
              this.usuario.saldo = response.saldo
              this.auth.usuario.next(this.usuario)
              this.toastr.success('Recarga realizada')
            }
          )
        } else {
          this.toastr.error('Saldo insuficiente')
        }
        document.getElementById("closeModal")?.click()
        this.spinner.hide()
      },
      () => {
        document.getElementById("closeModal")?.click()
        this.spinner.hide()
      }
    )
  }

  getSaldo() {
    this.disable = true
    this.userService.getSaldo().subscribe(
      (response: any) => {
        this.usuario.saldo = response.saldo
        this.auth.usuario.next(this.usuario)
        this.disable = false
      },
      () => this.disable = false
    )
  }

}
