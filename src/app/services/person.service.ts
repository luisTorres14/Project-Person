import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private API_SERVER = "http://localhost:8080/person/";

  constructor(private httpclient: HttpClient) { }

  getAllPersons(): Observable<any> {
    return this.httpclient.get(this.API_SERVER);
  }

  savePerson(person: any): Observable<any> {
    return this.httpclient.post(this.API_SERVER, person);
  }

  deletePerson(id: any): Observable<any> {
    return this.httpclient.delete(this.API_SERVER + "delete/" + id);
  }
}
