import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { AvisoService } from '../shared/aviso.service';
import { ScriptService } from '../shared/script.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private scripts: ScriptService,
    private auth: AuthService,
    private avisoService: AvisoService
  ) {
    this.scripts.loadScripts()
    this.auth.usuario.subscribe(
      usuario => {
        if (this.router.url === '/app') {
          if (usuario?.id_tipo === 1 || usuario?.id_tipo === 4) {
            this.router.navigate(['app/recargas-admin'])
          }
          if (usuario?.id_tipo === 3) {
            // this.avisoService.showActive().subscribe(
            //   (aviso: any) => {
            //     if (aviso) {
            //       Swal.fire({
            //         title: aviso.title,
            //         text: aviso.message,
            //       })
            //     }
            //   }
            // )
            this.router.navigate(['app/recargas'])
          }
        }
        if (usuario?.id_tipo === 3) {
          if (!this.avisoService.aviso.value) {
            this.avisoService.showActive().subscribe(
              (aviso: any) => {
                if (aviso) {
                  this.avisoService.aviso.next(aviso)
                  Swal.fire({
                    title: aviso.title,
                    text: aviso.message,
                  })
                }
              }
            )
          }
        }
      }
    )

  }

  ngOnInit(): void {
  }

}
