import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor(private http: HttpClient ) {
    
  }
  getToken() {
    return localStorage.getItem('currentUser');
   }
  saveData(dataobject) : Observable <any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.post('http://localhost:8080/api/feature/', dataobject ,{ headers : headers});
  }

  updateData(dataobject) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.put('http://localhost:8080/api/feature/', dataobject ,{ headers : headers});
  }
  GetList(id: string | null) : Observable<any> {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    if(id){
      return this.http.get('http://localhost:8080/api/feature/list/',{headers: headers});
    }else{
    return this.http.get('http://localhost:8080/api/feature/list/',{headers: headers});
   }
 }
 GetSelectList(id: string | null) : Observable<any> {
  let headers = new HttpHeaders({'x-access-token':this.getToken()});
  if(id){
    return this.http.get('http://localhost:8080/api/feature/select/'+id,{headers: headers});
  }else{
  return this.http.get('http://localhost:8080/api/feature/select/',{headers: headers});
 }
}
  deleteData(id: string) : Observable<any>  {
    let headers = new HttpHeaders({'x-access-token':this.getToken()});
    return this.http.delete('http://localhost:8080/api/feature/'+ id,{headers : headers});
  }

  getDataById(id) : Observable<any>  {
    let header = new HttpHeaders({'x-access-token':this.getToken()});
    console.log(id);
       return this.http.get('http://localhost:8080/api/feature/by_id/'+id,{headers : header})
  }
}
