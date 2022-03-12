import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { DepositoService } from '../shared/deposito.service';

@Component({
  selector: 'app-depositos-cliente',
  templateUrl: './depositos-cliente.component.html',
  styleUrls: ['./depositos-cliente.component.css']
})
export class DepositosClienteComponent implements OnInit {

  @ViewChild('fileUploader', { static: false }) fileUploader!: ElementRef;

  usuario: any

  form: FormGroup
  depositos: any

  constructor(
    private fb: FormBuilder,
    private afdb: AngularFireDatabase,
    private afs: AngularFireStorage,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private depositoService: DepositoService
  ) {
    this.depositoService.depositos.subscribe(
      depositos => this.depositos = depositos
    )
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.form = this.fb.group({
      valor: new FormControl(null, [
        Validators.required,
        Validators.min(20),
      ]),
      banco: new FormControl(null, [Validators.required]),
      comprobante: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern("^[0-9]*$"),
      ])
    })
  }

  ngOnInit(): void {
  }

  registrar() {
    if (!this.form.controls.valor.valid) {
      if (this.form.controls.valor.errors?.required) {
        this.toastr.error('Ingrese el valor del deposito')
      }
      if (this.form.controls.valor.errors?.min) {
        this.toastr.error('El valor minimo del deposito es de $20')
      }
      return
    }
    if (this.form.controls.banco.errors?.required) {
      this.toastr.error('Seleccione el banco')
      return
    }
    if (!this.form.controls.comprobante.valid) {
      if (this.form.controls.comprobante.errors?.required) {
        this.toastr.error('Ingrese el número de comprobante')
      }
      if (this.form.controls.comprobante.errors?.minlength) {
        this.toastr.error('El comprobante debe tener al menos 8 números')
      }
      if (this.form.controls.comprobante.errors?.maxlength) {
        this.toastr.error('El comprobante no debe tener mas de 15 números')
      }
      if (this.form.controls.comprobante.errors?.pattern) {
        this.toastr.error('Comprobante no valido')
      }
      return
    }
    if (this.depositos.find((x: any) => x.comprobante === this.form.value.comprobante)) {
      this.toastr.error('Número de comprobante ya se encuentra registrado')
      return
    }

    let image = this.fileUploader.nativeElement.files[0]
    if (!image) {
      this.toastr.error('Debe de subir la imagen del comprobante')
      return
    }
    if (image.type != 'image/jpeg' && image.type != 'image/png') {
      this.toastr.error('Solo se acepta imagenes')
      return
    }

    let request = { comprobante: this.form.value.comprobante }
    this.spinner.show()
    this.depositoService.comprobante(request).subscribe(
      response => {
        if (response) {
          this.toastr.error('Número de comprobante ya se encuentra registrado')
          this.spinner.hide()
          return
        }
        let path = 'depositos/' + this.usuario.id_usuario + '/' + image.name
        this.afs.upload(path, image).then(
          () => {
            if (this.form.valid) {
              this.form.value.id_usuario = this.usuario.id_usuario
              this.form.value.usuario = this.usuario.nombre
              this.form.value.date = new Date().toLocaleString()
              this.form.value.image_path = path
              this.afdb.list('depositos').push(this.form.value).then(
                () => {
                  this.form.reset()
                  this.fileUploader.nativeElement.value = null
                  this.toastr.success('Deposito registrado')
                  this.spinner.hide()
                }
              )
            }
          }
        )
      },
      () => this.spinner.hide()
    )
  }

}
