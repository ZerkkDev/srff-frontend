import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  email!: FormControl

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.email = new FormControl(null, [Validators.required, Validators.email])
  }

  ngOnInit(): void {
  }

  send() {
    if (this.email.valid) {
      this.spinner.show()
      this.auth.password({ email: this.email.value }).subscribe(
        (response: any) => {
          this.email.reset()
          if (response.message) {
            Swal.fire({
              icon: 'success',
              title: 'Correo enviado',
              text: 'Revise su correo en la bandeja de entrada o Spam',
              // footer: '<a href="">Why do I have this issue?</a>'
            })
          }
          this.spinner.hide()
        },
        error => {
          if (error.error.password) {
            this.toastr.error(error.error.password)
          }
          this.spinner.hide()
        }
      )
    }
  }

}
