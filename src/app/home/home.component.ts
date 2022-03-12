import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ScriptService } from '../shared/script.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  year: number

  constructor(
    private scripts: ScriptService
  ) {
    this.scripts.loadScripts()
    this.year = new Date().getFullYear()
  }

  ngOnInit(): void {
    // Swal.fire({
    //   imageUrl: '../../assets/img/promo/promo3.jpeg',
    //   imageHeight: 500,
    //   // imageAlt: 'A tall image'
    // })
    // Swal.fire({
    //   title: '¡Aviso!',
    //   // text: 'Para las personas que no puedan ingresar a la nueva pagina, usen el siguiente enlace.',
    //   // icon: 'info',
    //   html: 'Para las personas que no puedan ingresar a la nueva pagina, usen el siguiente enlace. <br><br>' +
    //     '<a href="https://www.zonagamerstore.com/#/login" target="_blank" style="color: rgb(31, 67, 187);">Iniciar Sesión</a>'
    // })
  }

  aviso() {
    Swal.fire({
      title: '¡En Mantenimiento!',
      text: '',
    })
  }

}
