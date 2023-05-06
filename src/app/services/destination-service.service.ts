import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from '../models/destination';

@Injectable({
  providedIn: 'root',
})
export class DestinationServiceService {

  constructor(private http: HttpClient) { }

  getAllDestinations(): Observable<any[]> {
    const path = environment.app_uri + "allDestinations";
    return this.http.get<any[]>(path);
  }

  getDestinationById(destinationId: string): Observable<any> {
    const path = environment.app_uri + "destinationById" + "?destinationId=" + destinationId;
    return this.http.get<any>(path);
  }
}
