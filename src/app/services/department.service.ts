import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private API_SERVER = "http://localhost:8080/department/";

  constructor(private httpclient: HttpClient) { }

  getAllDepartmentsByCountry(idCountry: any): Observable<any> {
    return this.httpclient.get(this.API_SERVER + idCountry);

  }
}
