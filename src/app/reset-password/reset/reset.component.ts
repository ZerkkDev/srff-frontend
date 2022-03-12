import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  form: FormGroup
  token!: string

  type: string
  icon: string

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.type = 'password'
    this.icon = 'fa fa-eye-slash'
    this.form = fb.group({
      password: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      password_confirm: new FormControl(null, [Validators.required]),
    })
    this.route.params.subscribe(
      (params: any) => {
        this.token = params.token
      }
    )
  }

  ngOnInit(): void {
  }

  send() {
    if (!this.form.controls.password.valid) {
      if (this.form.controls.password.errors?.required) {
        this.toastr.error('Ingrese una contraseña')
      }
      if (this.form.controls.password.errors?.minlength) {
        this.toastr.error('La contraseña debe tener al menos 10 caracteres')
      }
      return
    }
    if (this.form.controls.password.value !== this.form.controls.password_confirm.value) {
      this.toastr.error('Las contraseñas no son iguales')
      return
    }
    if (this.form.valid) {
      this.spinner.show()
      this.form.value.token = this.token
      this.auth.passwordReset(this.form.value).subscribe(
        (response: any) => {
          if (response) {
            this.form.reset()
            this.toastr.success(response.message)
            this.router.navigate(['login'])
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

  showPassword() {
    if (this.type == 'password') {
      this.type = 'text'
      this.icon = 'fa fa-eye'
    } else {
      this.type = 'password'
      this.icon = 'fa fa-eye-slash'
    }
  }

}
