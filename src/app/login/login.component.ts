import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  type: string
  icon: string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.type = 'password'
    this.icon = 'fa fa-eye-slash'
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.spinner.show()
      this.auth.auth(this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token)
          this.auth.usuario.next(response.usuario)
          this.router.navigate(['app'])
          this.spinner.hide()
        },
        error => {
          if (error.error.auth) {
            this.toastr.error(error.error.auth)
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
