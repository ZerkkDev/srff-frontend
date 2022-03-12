import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  type: string
  icon: string

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    this.type = 'password'
    this.icon = 'fa fa-eye-slash'
    this.form = this.fb.group({
      nombre: new FormControl(null, [Validators.required]),
      cedula_ruc: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern("^[0-9]*$"),
      ]),
      telefono: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$"),
      ]),
      direccion: new FormControl(null, [Validators.required]),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasenia: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirmacion: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  register() {
    if (!this.form.controls.nombre.valid) {
      if (this.form.controls.nombre.errors?.required) {
        this.toastr.error('Ingrese su nombre')
      }
      return
    }
    if (!this.form.controls.cedula_ruc.valid) {
      if (this.form.controls.cedula_ruc.errors?.required) {
        this.toastr.error('Ingrese su cédula o Ruc')
      }
      if (this.form.controls.cedula_ruc.errors?.minlength) {
        this.toastr.error('La cédula debe tener al menos 10 números')
      }
      if (this.form.controls.cedula_ruc.errors?.maxlength) {
        this.toastr.error('La cédula no debe tener más de 13 números')
      }
      if (this.form.controls.cedula_ruc.errors?.pattern) {
        this.toastr.error('Cédula no valida')
      }
      return
    }
    if (!this.form.controls.telefono.valid) {
      if (this.form.controls.telefono.errors?.required) {
        this.toastr.error('Ingrese su número de telefono')
      }
      if (this.form.controls.telefono.errors?.minlength) {
        this.toastr.error('El telefono debe tener al menos 10 números')
      }
      if (this.form.controls.telefono.errors?.maxlength) {
        this.toastr.error('El telefono no debe tener más de 10 números')
      }
      if (this.form.controls.telefono.errors?.pattern) {
        this.toastr.error('Teléfono no valida')
      }
      return
    }
    if (!this.form.controls.direccion.valid) {
      if (this.form.controls.direccion.errors?.required) {
        this.toastr.error('Ingrese su ciudad')
      }
      return
    }
    if (!this.form.controls.correo.valid) {
      if (this.form.controls.correo.errors?.required) {
        this.toastr.error('Ingrese su correo')
      }
      if (this.form.controls.correo.errors?.pattern) {
        this.toastr.error('Correo no valido')
      }
      return
    }
    if (!this.form.controls.contrasenia.valid) {
      if (this.form.controls.contrasenia.errors?.required) {
        this.toastr.error('Ingrese una contraseña')
      }
      if (this.form.controls.contrasenia.errors?.minlength) {
        this.toastr.error('La contraseña debe tener al menos 10 caracteres')
      }
      return
    }
    if (this.form.controls.contrasenia.value !== this.form.controls.confirmacion.value) {
      this.toastr.error('Las contraseñas no son iguales')
      return
    }

    if (this.form.valid) {
      this.spinner.show()
      this.auth.register(this.form.value).subscribe(
        (response: any) => {
          if (response.message) {
            Swal.fire({
              icon: 'success',
              title: 'Cuenta Creada',
              text: 'Revise su correo en la bandeja de entrada o Spam',
              // footer: '<a href="">Why do I have this issue?</a>'
            })
          }
          this.form.reset()
          this.spinner.hide()
        },
        error => {
          if (error.error.register) {
            this.toastr.error(error.error.register)
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
