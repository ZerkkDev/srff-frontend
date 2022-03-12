import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecargasService } from '../shared/recargas.service';
import { addDays } from 'date-fns';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../shared/auth.service';
import { PreciosService } from '../shared/precios.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-historial-recargas',
  templateUrl: './historial-recargas.component.html',
  styleUrls: ['./historial-recargas.component.css']
})
export class HistorialRecargasComponent implements OnInit {

  page: any
  usuario: any
  precios: any
  request: any

  desde: FormControl
  hasta: FormControl
  id_jugador: FormControl
  porcentaje: FormControl
  id_precio: FormControl

  ganancia!: number

  constructor(
    private afdb: AngularFireDatabase,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private recargaService: RecargasService,
    private precioService: PreciosService
  ) {
    this.auth.usuario.subscribe(
      user => {
        this.usuario = user
      }
    )
    this.precioService.precios.subscribe(
      lista => this.precios = lista
    )
    this.desde = new FormControl(null, Validators.required)
    this.hasta = new FormControl(null, Validators.required)
    this.id_jugador = new FormControl(null, Validators.required)
    this.porcentaje = new FormControl(null, Validators.required)
    this.id_precio = new FormControl(0, Validators.required)
  }

  ngOnInit(): void {
  }

  validateDates() {
    if (!this.desde.valid || !this.hasta.valid) {
      this.toastr.error('Seleccione dos fechas')
      return
    }
    let desde = new Date(this.desde.value)
    let hasta = new Date(this.hasta.value)
    if (desde > hasta) {
      this.toastr.error('Fechas no validas')
      return
    }
    desde = addDays(desde, 1)
    hasta = addDays(hasta, 2)
    return {
      desde: this.datePipe.transform(desde, 'yyyy-MM-dd'),
      hasta: this.datePipe.transform(hasta, 'yyyy-MM-dd'),
      porcentaje: this.porcentaje.value
    }
  }

  validateDates2() {
    if (!this.desde.valid || !this.hasta.valid) {
      this.toastr.error('Seleccione dos fechas')
      return
    }
    let desde = new Date(this.desde.value)
    let hasta = new Date(this.hasta.value)
    if (desde > hasta) {
      this.toastr.error('Fechas no validas')
      return
    }
    return {
      desde: this.desde.value,
      hasta: this.hasta.value,
      porcentaje: this.porcentaje.value,
      id_precio: this.id_precio.value
    }
  }

  showByDates() {
    this.id_jugador.reset()
    if (this.usuario?.id_tipo == 1) {
      this.request = this.validateDates2()
    } else {
      this.request = this.validateDates()
    }
    if (this.request) {
      this.spinner.show()
      this.recargaService.showByDates(this.request).subscribe(
        response => {
          this.setPage(response)
          this.spinner.hide()
        },
        () => this.spinner.hide()
      )
    }
  }

  showByIdJugador() {
    this.desde.reset()
    this.hasta.reset()
    this.id_precio.reset()
    if (!this.id_jugador.valid) {
      this.toastr.error('Ingrese el ID del jugador')
      return
    }
    this.request = { id_jugador: this.id_jugador.value }
    this.spinner.show()
    this.recargaService.showByIdJugador(this.request).subscribe(
      response => {
        this.setPage(response)
        this.spinner.hide()
      },
      () => this.spinner.hide()
    )
  }

  paginate(url: string) {
    if (this.request) {
      this.spinner.show()
      this.recargaService.paginate(this.request, url).subscribe(
        response => {
          this.setPage(response)
          this.spinner.hide()
        },
        () => this.spinner.hide()
      )
    }
  }

  setPage(response: any) {
    if (response) {
      this.page = response
      this.page.links[0].icon = 'fa fa-angle-left'
      this.page.links[this.page.links.length - 1].icon = 'fa fa-angle-right'
    }
  }

  calcularGanancia() {
    let suma = 0
    if (this.porcentaje.valid) {
      this.request = this.validateDates2()
      this.spinner.show()
      this.recargaService.calcularGanancia(this.request).subscribe(
        (response: any) => {
          response.forEach((element: any) => {
            let x = this.porcentaje.value * Math.ceil(element)
            suma += element - x
          });
          this.ganancia = +suma.toFixed(2)
          this.spinner.hide()
        },
        () => this.spinner.hide()
      )
    }
  }

  reenviar(recarga: any) {
    this.spinner.show()
    this.recargaService.show(recarga.id).subscribe(
      (recarga: any) => {
        if (recarga.realizado == 2) {
          let recargas = this.recargaService.recargas.value
          let search = recargas.find((x: any) => x.id == recarga.id)
          if (search) {
            this.toastr.warning('La recarga ya esta en cola.')
          } else {
            this.afdb.list('recargas').push(recarga).then(
              () => this.toastr.success('Recarga enviada')
            )
          }
        } else {
          this.page.data = this.page.data.map(
            (x: any) => {
              if (x.id == recarga.id) {
                return recarga
              }
              return x
            }
          )
        }
        this.spinner.hide()
      },
      () => this.spinner.hide()
    )
  }

}
