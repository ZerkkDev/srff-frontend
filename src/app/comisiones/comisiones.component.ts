import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { addDays } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RecargasService } from '../shared/recargas.service';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

  page: any
  request: any

  desde: FormControl
  hasta: FormControl

  constructor(
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private recargaService: RecargasService
  ) {
    this.desde = new FormControl(null, Validators.required)
    this.hasta = new FormControl(null, Validators.required)
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

  buscar() {
    this.request = this.validateDates();
    this.spinner.show()
    this.recargaService.comisiones(this.request).subscribe(
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

}
