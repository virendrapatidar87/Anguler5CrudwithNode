import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(private http: HttpClient) {

  }
  getToken() {
    return localStorage.getItem('currentUser');
  }
  saveData(dataobject): Observable<any> {
    let headers = new HttpHeaders({ 'x-access-token': this.getToken() });
    return this.http.post('http://localhost:8080/api/scenario/', dataobject, { headers: headers });
  }

  updateData(dataobject): Observable<any> {
    let headers = new HttpHeaders({ 'x-access-token': this.getToken() });
    return this.http.put('http://localhost:8080/api/scenario/', dataobject, { headers: headers });
  }
 /*  GetList(id: string | null): Observable<any> {
    let headers = new HttpHeaders({ 'x-access-token': this.getToken() });
    if (id) {
      return this.http.get('http://localhost:8080/api/scenario/list' + id, { headers: headers });
    } else {
      return this.http.get('http://localhost:8080/api/scenario/list', { headers: headers });
    }
  } */
  
  GetList(projectId: string | null, categoryId: string | null): Observable<any> {
    let headers = new HttpHeaders({ 'x-access-token': this.getToken() });
    if (projectId) {
      if (categoryId) {
        return this.http.get('http://localhost:8080/api/scenario/list/' + projectId + '/' + categoryId, { headers: headers });
      } else {
        return this.http.get('http://localhost:8080/api/scenario/list/' + projectId, { headers: headers });
      }
    } else {
      return this.http.get('http://localhost:8080/api/scenario/list', { headers: headers });
    }
  }

  GetSelectList(id: string | null): Observable<any> {
    let headers = new HttpHeaders({ 'x-access-token': this.getToken() });
    if (id) {
      return this.http.get('http://localhost:8080/api/scenario/select/' + id, { headers: headers });
    } else {
      return this.http.get('http://localhost:8080/api/scenario/select/', { headers: headers });
    }
  }
  deleteData(id: string): Observable<any> {
    let headers = new HttpHeaders({ 'x-access-token': this.getToken() });
    return this.http.delete('http://localhost:8080/api/scenario/' + id, { headers: headers });
  }

  getDataById(id): Observable<any> {
    let header = new HttpHeaders({ 'x-access-token': this.getToken() });
    console.log(id);
    return this.http.get('http://localhost:8080/api/scenario/by_id/' + id, { headers: header })
  }
}
