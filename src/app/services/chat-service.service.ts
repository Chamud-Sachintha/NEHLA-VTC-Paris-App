import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http: HttpClient) { }

  getAllConnectedAgentList():Observable<any[]> {
    const path = environment.chat_server_url + "getAgentList";
    return this.http.get<any[]>(path);
  }
}
