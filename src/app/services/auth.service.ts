import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validateCustomerLogin(loginDetails: any): Observable<any> {
    const path = environment.app_uri + "clientValidate";
    return this.http.post<any[]>(path, loginDetails);
  }

  registerNewClient(clientDetails: Client): Observable<any> {
    const path = environment.app_uri + "client";
    return this.http.post<any>(path, clientDetails);
  }

  isClientLoggedIn() {
    return localStorage.getItem("emailAddress") != null;
  }
}
