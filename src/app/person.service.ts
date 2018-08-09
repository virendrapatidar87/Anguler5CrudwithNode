import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/* const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','x-access-token':'test' })
}; */

//const headers = new HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
@Injectable()
export class PersonService {
  
  

  constructor(private http: HttpClient ) {
    
  }
  getToken() {
    return localStorage.getItem('currentUser');
   }
  saveUser(user) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.post('http://localhost:8080/api/note/saveNote/', user ,{ headers : headers});
  }

  GetUser() : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.get('http://localhost:8080/api/note/getNote/',{headers: headers});
  }
  deleteUser(id) : Observable<any>  {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.post('http://localhost:8080/api/note/deleteNote/', {'id': id},{headers : headers});
  }

  getUser(id) : Observable<any>  {
    let header = new HttpHeaders({'x-access-token':this.getToken()});
       return this.http.get('http://localhost:8080/api/note/getNote/'+id,{headers : header})
  }
}
