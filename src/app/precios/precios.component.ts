import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PreciosService } from '../shared/precios.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  precios: any

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private precioService: PreciosService
  ) {
    this.precioService.precios.subscribe(
      precios => {
        if (precios) {
          this.precios = precios
        } else {
          this.precioService.preciosActivos().subscribe(
            response => this.precioService.precios.next(response)
          )
        }
      }
    )
  }

  ngOnInit(): void {
  }

  guardar(precio: any) {
    this.spinner.show()
    this.precioService.update(precio, precio.id_precio).subscribe(
      response => {
        this.toastr.success('Guardado')
        this.spinner.hide()
      },
      () => this.spinner.hide()
    )
  }

}
