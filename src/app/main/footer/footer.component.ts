import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number
  usuario: any

  constructor(private auth: AuthService) {
    this.auth.usuario.subscribe(
      usuario => this.usuario = usuario
    )
    this.year = new Date().getFullYear()
  }

  ngOnInit(): void {
  }

}
