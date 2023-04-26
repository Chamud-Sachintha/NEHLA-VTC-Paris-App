import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  public journeyFormValueData = new BehaviorSubject<any>([]);

  constructor() { }

  setJouneyDataValues(data: any) {
    this.journeyFormValueData.next(data);
  }

  getJouneyDataValues() {
    return this.journeyFormValueData.asObservable();
  }
}
