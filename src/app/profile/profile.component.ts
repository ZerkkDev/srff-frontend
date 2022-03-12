import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: any

  datos: FormGroup
  contrasenia: FormGroup

  type: string
  icon: string

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private auth: AuthService,
    private userService: UserService
  ) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.type = 'password'
    this.icon = 'fa fa-eye-slash'
    this.datos = this.fb.group({
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
      correo: new FormControl(null, [Validators.required, Validators.email])
    })

    this.contrasenia = this.fb.group({
      contrasenia: new FormControl(null, [Validators.required]),
      nueva: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirmacion: new FormControl(null, [Validators.required])
    })

    this.datos.patchValue(this.usuario)
  }

  ngOnInit(): void {
  }

  register() {
    if (!this.datos.controls.nombre.valid) {
      if (this.datos.controls.nombre.errors?.required) {
        this.toastr.error('Ingrese su nombre')
      }
      return
    }
    if (!this.datos.controls.cedula_ruc.valid) {
      if (this.datos.controls.cedula_ruc.errors?.required) {
        this.toastr.error('Ingrese su cédula o Ruc')
      }
      if (this.datos.controls.cedula_ruc.errors?.minlength) {
        this.toastr.error('La cédula debe tener al menos 10 números')
      }
      if (this.datos.controls.cedula_ruc.errors?.maxlength) {
        this.toastr.error('La cédula no debe tener más de 13 números')
      }
      if (this.datos.controls.cedula_ruc.errors?.pattern) {
        this.toastr.error('Cédula no valida')
      }
      return
    }
    if (!this.datos.controls.telefono.valid) {
      if (this.datos.controls.telefono.errors?.required) {
        this.toastr.error('Ingrese su número de telefono')
      }
      if (this.datos.controls.telefono.errors?.minlength) {
        this.toastr.error('El telefono debe tener al menos 10 números')
      }
      if (this.datos.controls.telefono.errors?.maxlength) {
        this.toastr.error('El telefono no debe tener más de 10 números')
      }
      if (this.datos.controls.telefono.errors?.pattern) {
        this.toastr.error('Teléfono no valida')
      }
      return
    }
    if (!this.datos.controls.direccion.valid) {
      if (this.datos.controls.direccion.errors?.required) {
        this.toastr.error('Ingrese su ciudad')
      }
      return
    }
    if (!this.datos.controls.correo.valid) {
      if (this.datos.controls.correo.errors?.required) {
        this.toastr.error('Ingrese su correo')
      }
      if (this.datos.controls.correo.errors?.pattern) {
        this.toastr.error('Correo no valido')
      }
      return
    }

    if (this.datos.valid) {
      this.spinner.show()
      this.userService.update(this.datos.value, this.usuario.id_usuario).subscribe(
        (usuario: any) => {
          if (usuario) {
            usuario.modules = this.usuario.modules
            this.auth.usuario.next(usuario)
            this.toastr.success('Información Guardada')
          }
          this.spinner.hide()
        },
        error => {
          // if (error.error.register) {
          //   this.toastr.error(error.error.register)
          // }
          this.spinner.hide()
        }
      )
    }
  }

  cambiar() {
    if (!this.contrasenia.controls.contrasenia.valid) {
      if (this.contrasenia.controls.contrasenia.errors?.required) {
        this.toastr.error('Ingrese la contraseña actual')
      }
      return
    }
    if (!this.contrasenia.controls.nueva.valid) {
      if (this.contrasenia.controls.nueva.errors?.required) {
        this.toastr.error('Ingrese una nueva contraseña')
      }
      if (this.contrasenia.controls.nueva.errors?.minlength) {
        this.toastr.error('La nueva contraseña debe tener al menos 10 caracteres')
      }
      return
    }
    if (this.contrasenia.controls.nueva.value !== this.contrasenia.controls.confirmacion.value) {
      this.toastr.error('Las contraseñas no son iguales')
      return
    }

    if (this.contrasenia.valid) {
      this.spinner.show()
      this.userService.cambioContrasenia(this.contrasenia.value).subscribe(
        (response: any) => {
          if (response) {
            this.toastr.success(response.message)
          }
          this.contrasenia.reset()
          this.spinner.hide()
        },
        error => {
          if (error.error.contrasenia) {
            this.toastr.error(error.error.contrasenia)
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
