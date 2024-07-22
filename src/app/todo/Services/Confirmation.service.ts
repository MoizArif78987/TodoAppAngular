import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  public confirmationSubject= new Subject<string>()
  constructor() { }

  sendConfirmation(data){
    this.confirmationSubject.next(data);
  }
}
