import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import addDays from 'date-fns/addDays';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { DepositoService } from '../shared/deposito.service';

@Component({
  selector: 'app-historial-depositos',
  templateUrl: './historial-depositos.component.html',
  styleUrls: ['./historial-depositos.component.css']
})
export class HistorialDepositosComponent implements OnInit {

  page: any
  usuario: any

  desde: FormControl
  hasta: FormControl
  comprobante: FormControl

  request: any

  constructor(
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private depositoService: DepositoService
  ) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.desde = new FormControl(null, Validators.required)
    this.hasta = new FormControl(null, Validators.required)
    this.comprobante = new FormControl(null, Validators.required)
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
    }
  }

  showByDates() {
    this.comprobante.reset()
    this.request = this.validateDates()
    if (this.request) {
      this.spinner.show()
      this.depositoService.showByDates(this.request).subscribe(
        response => {
          this.setPage(response)
          this.spinner.hide()
        },
        () => this.spinner.hide()
      )
    }
  }

  showByComprobante() {
    this.desde.reset()
    this.hasta.reset()
    if (this.comprobante.valid) {
      this.spinner.show()
      this.request = { comprobante: this.comprobante.value }
      this.depositoService.showByComprobante(this.request).subscribe(
        response => {
          this.setPage(response)
          this.spinner.hide()
        },
        () => this.spinner.hide()
      )
    }
  }

  paginate(url: string) {
    if (this.desde.valid && this.hasta.valid) {
      this.request = this.validateDates()
    }
    if (this.request) {
      this.spinner.show()
      this.depositoService.paginate(url, this.request).subscribe(
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

}
