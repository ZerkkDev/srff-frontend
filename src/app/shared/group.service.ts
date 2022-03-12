import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private base = environment.base
  groups: BehaviorSubject<any>

  constructor(private http: HttpClient) {
    this.groups = new BehaviorSubject<any>(null)
  }

  private options() {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    }
  }

  index() {
    return this.http.get(this.base + 'group', this.options())
  }

  store(request: any) {
    return this.http.post(this.base + 'group', request, this.options())
  }

  show(id: number) {
    return this.http.get(this.base + 'group/' + id, this.options())
  }

  update(request: any, id: number) {
    return this.http.put(this.base + 'group/' + id, request, this.options())
  }

  destroy(id: number) {
    return this.http.delete(this.base + 'group/' + id, this.options())
  }

}
