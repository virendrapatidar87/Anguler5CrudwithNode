import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  
  constructor(private http: HttpClient) {}

  register(user) : Observable<any> {
    return this.http.post('http://localhost:8080/api/user/register/', user)
      
  }

  login(user) : Observable<any>{
    return this.http.post('http://localhost:8080/api/user/login/', user)
}
}
