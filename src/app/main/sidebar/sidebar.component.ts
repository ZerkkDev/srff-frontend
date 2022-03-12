import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  modules: any

  constructor(
    private auth: AuthService
  ) {
    this.auth.usuario.subscribe(
      usuario => this.modules = usuario?.modules
    )
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout()
  }

}
