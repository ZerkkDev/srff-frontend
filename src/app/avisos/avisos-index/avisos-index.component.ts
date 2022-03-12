import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AvisoService } from 'src/app/shared/aviso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avisos-index',
  templateUrl: './avisos-index.component.html',
  styleUrls: ['./avisos-index.component.css']
})
export class AvisosIndexComponent implements OnInit {

  avisos: any

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private avisoService: AvisoService
  ) {
    this.avisoService.avisos.subscribe(
      avisos => this.avisos = avisos
    )
    if (!this.avisoService.avisos.value) {
      this.avisoService.index().subscribe(
        response => this.avisoService.avisos.next(response)
      )
    }
  }

  ngOnInit(): void {
  }

  store() {
    let request = {
      title: 'titulo',
      message: 'mensaje',
      active: false
    }
    this.spinner.show()
    this.avisoService.store(request).subscribe(
      response => {
        this.avisos.push(response)
        this.spinner.hide()
      },
      () => {
        this.spinner.hide()
      }
    )
  }

  update(aviso: any) {
    this.spinner.show()
    this.avisoService.update(aviso, aviso.id).subscribe(
      response => {
        if (aviso.active === true) {
          this.avisos.map(
            (x: any) => {
              x.active = false
              if (x.id == aviso.id) {
                x.active = true
              }
            }
          )
        }
        this.toastr.success('Guardado')
        this.spinner.hide()
      },
      () => {
        this.spinner.hide()
      }
    )
  }

  destroy(id: number) {
    this.spinner.show()
    this.avisoService.destroy(id).subscribe(
      response => {
        this.avisos = this.avisos.filter((aviso: any) => aviso.id !== id);
        this.toastr.error('Aviso Eliminado')
        this.spinner.hide()
      },
      () => {
        this.spinner.hide()
      }
    )
  }

  test(aviso: any) {
    Swal.fire({
      title: aviso.title,
      text: aviso.message,
    })
  }

}
