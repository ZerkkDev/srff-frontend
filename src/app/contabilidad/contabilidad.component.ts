import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { addDays } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../shared/auth.service';
import { RecargasService } from '../shared/recargas.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {

  precios: any
  dia: FormControl
  total!: number

  usuario: any
  empleados: any
  id_usuario: FormControl

  constructor(
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private usuarioService: UserService,
    private recargaService: RecargasService
  ) {
    this.usuarioService.empleados().subscribe(
      response => {
        this.empleados = response
      }
    )
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.dia = new FormControl(null, Validators.required)
    this.id_usuario = new FormControl(null)
  }

  ngOnInit(): void {
  }

  validateDates() {
    let desde = new Date(this.dia.value)
    let hasta = new Date(this.dia.value)
    desde = addDays(desde, 1)
    hasta = addDays(hasta, 2)
    return {
      desde: this.datePipe.transform(desde, 'yyyy-MM-dd'),
      hasta: this.datePipe.transform(hasta, 'yyyy-MM-dd'),
      id_usuario: this.id_usuario.value
    }
  }

  consultar() {
    if (this.dia.valid) {
      this.spinner.show()
      let request = this.validateDates()
      this.recargaService.contabilidad(request).subscribe(
        response => {
          this.precios = response

          this.total = 0
          this.precios.forEach(
            (precio: any) => {
              this.total += precio.total
            }
          )
          this.total = +this.total.toFixed(2)
          this.spinner.hide()
        },
        () => this.spinner.hide()
      )
    }
  }

}
