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

  validateCustomerLogin() {
    const path = environment.app_uri + "allClients";
    return this.http.get<any[]>(path);
  }

  registerNewClient(clientDetails: Client): Observable<any> {
    const path = environment.app_uri + "client";
    return this.http.post<any>(path, clientDetails);
  }
}
