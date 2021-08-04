import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private API_SERVER = "http://localhost:8080/country/";

  constructor(private httpclient: HttpClient) { }

  getAllCountries(): Observable<any> {
    return this.httpclient.get(this.API_SERVER);
  }
}
