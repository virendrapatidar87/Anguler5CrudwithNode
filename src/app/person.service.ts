import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class PersonService {

  constructor(private http: Http) {}

  saveUser(user) {
    return this.http.post('http://localhost:8080/api/person/saveUser/', user)
      .map((response: Response) => response.json())
  }

  GetUser() {
    return this.http.get('http://localhost:8080/api/person/getUser/')
      .map((response: Response) => response.json())
  }
  deleteUser(id) {
    return this.http.post('http://localhost:8080/api/person/deleteUser/', {'id': id})
      .map((response: Response) => response.json())
  }

  getUser(id) {
    return this.http.get('http://localhost:8080/api/person/getUser/'+id)
      .map((response: Response) => response.json())
  }
}
