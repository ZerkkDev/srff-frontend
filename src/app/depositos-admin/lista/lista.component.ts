import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DepositoService } from 'src/app/shared/deposito.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuario: any
  depositos: any

  disable: boolean

  subscription: Subscription

  constructor(
    private router: Router,
    private afdb: AngularFireDatabase,
    private auth: AuthService,
    private depositoService: DepositoService
  ) {
    this.subscription = this.depositoService.depositos.subscribe(
      lista => {
        this.depositos = lista?.filter(
          (x: any) => { return x.aprobado_por ? false : true }
        )
      }
    )
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.disable = false
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  seleccionar(recarga: any) {
    this.disable = true
    this.afdb.object('depositos/' + recarga.key).update({ aprobado_por: this.usuario.id_usuario }).then(
      () => {
        this.router.navigate(['app/depositos-admin/deposito'])
        this.disable = false
      }
    )
  }

}
