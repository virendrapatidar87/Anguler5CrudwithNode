import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient ) {
    
  }
  getToken() {
    return localStorage.getItem('currentUser');
   }
  saveData(dataobject) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.post('http://localhost:8080/api/project/', dataobject ,{ headers : headers});
  }

  updateData(dataobject) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.put('http://localhost:8080/api/project/', dataobject ,{ headers : headers});
  }
  GetList() : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.get('http://localhost:8080/api/project/',{headers: headers});
  }
  GetSelectList() : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.get('http://localhost:8080/api/project/select',{headers: headers});
  }
  deleteData(id) : Observable<any>  {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.delete('http://localhost:8080/api/project/'+ id,{headers : headers});
  }

  getDataById(id) : Observable<any>  {
    let header = new HttpHeaders({'x-access-token':this.getToken()});
       return this.http.get('http://localhost:8080/api/project/'+id,{headers : header})
  }
}
