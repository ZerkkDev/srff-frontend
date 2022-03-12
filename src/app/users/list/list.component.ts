import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/shared/group.service';
import { TipoUsuarioService } from 'src/app/shared/tipo-usuario.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  page: any
  tipos: any
  groups: any

  nombre: FormControl
  id_group: FormControl

  request: any

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private tiposService: TipoUsuarioService,
    private groupService: GroupService
  ) {
    this.initTipos()
    this.initGroups()
    this.userService.page.subscribe(
      page => this.page = page
    )
    this.nombre = new FormControl(null, Validators.required)
    this.id_group = new FormControl(null, Validators.required)
  }

  ngOnInit(): void {
  }

  initTipos() {
    if (!this.tiposService.tipos.value) {
      this.tiposService.index().subscribe(
        response => this.tiposService.tipos.next(response)
      )
    }
    this.tiposService.tipos.subscribe(
      tipos => this.tipos = tipos
    )
  }

  initGroups() {
    if (!this.groupService.groups.value) {
      this.groupService.index().subscribe(
        response => this.groupService.groups.next(response)
      )
    }
    this.groupService.groups.subscribe(
      groups => this.groups = groups
    )
  }

  showByNombre() {
    this.id_group.reset()
    if (this.nombre.valid) {
      this.request = { nombre: this.nombre.value }
      this.spinner.show()
      this.userService.showByNombre(this.request).subscribe(
        response => {
          this.setPage(response)
          this.spinner.hide()
        },
        () => this.spinner.hide()
      )
    }
  }

  showByGroup() {
    this.nombre.reset()
    if (this.id_group.valid) {
      this.request = { id_group: this.id_group.value }
      this.spinner.show()
      this.userService.showByGroup(this.request).subscribe(
        response => {
          this.setPage(response)
          this.spinner.hide()
        },
        () => this.spinner.hide()
      )
    }
  }

  paginate(url: string) {
    this.spinner.show()
    this.userService.paginate(url, this.request).subscribe(
      response => {
        this.setPage(response)
        this.spinner.hide()
      },
      () => this.spinner.hide()
    )
  }

  setPage(response: any) {
    if (response) {
      response.links[0].icon = 'fa fa-angle-left'
      response.links[response.links.length - 1].icon = 'fa fa-angle-right'
      this.userService.page.next(response)
    }
  }

  guardar(user: any) {
    if (user.id_group == 'null') {
      user.id_group = null
    }
    this.spinner.show()
    this.userService.update(user, user.id_usuario).subscribe(
      () => {
        this.toastr.success('Guardado')
        this.spinner.hide()
      },
      () => this.spinner.hide()
    )
  }

}
