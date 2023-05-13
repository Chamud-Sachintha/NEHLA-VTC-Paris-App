import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  public journeyFormValueData = new BehaviorSubject<any>([]);

  constructor() { }

  setPageValueArray(data: any) {
    this.journeyFormValueData.next(data);
  }

  getPageValueArray() {
    return this.journeyFormValueData.asObservable();
  }
}
