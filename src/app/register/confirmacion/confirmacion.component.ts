import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  text: string

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.text = 'Confirmando...'
    this.route.params.subscribe(
      (params: any) => {
        if (params.token) {
          this.spinner.show()
          this.auth.confirmacion({ token: params.token }).subscribe(
            (response: any) => {
              if (response.message) {
                this.toastr.success(response.message)
                this.text = 'Cuenta Activada'
              }
              this.spinner.hide()
            },
            error => {
              if (error.error) {
                this.text = error.error
              }
              // this.text = 'Su cuenta no se activo'
              this.spinner.hide()
            }
          )
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
