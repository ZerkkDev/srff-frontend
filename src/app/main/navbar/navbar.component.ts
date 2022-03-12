import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { DepositoService } from 'src/app/shared/deposito.service';
import { RecargasService } from 'src/app/shared/recargas.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  recargas: any
  depositos: any

  usuario: any

  constructor(
    private auth: AuthService,
    private recargaService: RecargasService,
    private depositoService: DepositoService
  ) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    if (this.usuario?.id_tipo == 3) {
      this.recargaService.recargas.subscribe(
        list => {
          this.recargas = list?.filter(
            (x: any) => { return x.id_usuario === this.usuario?.id_usuario }
          )
        }
      )
      this.depositoService.depositos.subscribe(
        list => {
          this.depositos = list?.filter(
            (x: any) => { return x.id_usuario === this.usuario?.id_usuario }
          )
        }
      )
    }
    if (this.usuario?.id_tipo === 1 || this.usuario?.id_tipo === 4) {
      this.depositoService.depositos.subscribe(
        lista => {
          this.depositos = lista?.filter(
            (x: any) => { return x.aprobado_por ? false : true }
          )
        }
      )
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout()
  }

  collapse() {

  }

}
