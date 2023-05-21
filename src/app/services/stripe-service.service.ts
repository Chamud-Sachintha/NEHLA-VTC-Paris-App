import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeServiceService {

  constructor(private http: HttpClient) { }

  getUniqueIDsFromStripe(paymentBody: any) {
    const path = environment.app_uri + "payment-sheet";
    return this.http.post<any>(path, paymentBody).pipe(first());
  }
}
