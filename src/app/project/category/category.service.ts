import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient ) {
    
  }
  getToken() {
    return localStorage.getItem('currentUser');
   }
  saveData(dataobject) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.post('http://localhost:8080/api/category/', dataobject ,{ headers : headers});
  }

  updateData(dataobject) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.put('http://localhost:8080/api/category/', dataobject ,{ headers : headers});
  }
  GetList(id: string | null) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    if(id){
      return this.http.get('http://localhost:8080/api/category/list'+id,{headers: headers});
    }else{
    return this.http.get('http://localhost:8080/api/category/list',{headers: headers});
   }
 }
 GetSelectList(id: string | null) : Observable<any> {
  let headers = new HttpHeaders({'x-access-token':this.getToken()});
  if(id){
    return this.http.get('http://localhost:8080/api/category/select/'+id,{headers: headers});
  }else{
  return this.http.get('http://localhost:8080/api/category/select/',{headers: headers});
 }
}
  deleteData(id: string) : Observable<any>  {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.delete('http://localhost:8080/api/category/'+ id,{headers : headers});
  }

  getDataById(id) : Observable<any>  {
    let header = new HttpHeaders({'x-access-token':this.getToken()});
    console.log(id);
       return this.http.get('http://localhost:8080/api/category/by_id/'+id,{headers : header})
  }
}
