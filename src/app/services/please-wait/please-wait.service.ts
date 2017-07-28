import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class PleaseWaitService {

  _isWaiting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  get waiting() {
    return this._isWaiting.asObservable();
  }

  startWaiting() {
    this._isWaiting.next(true);
  }

  stopWaiting() {
    this._isWaiting.next(false);
  }

}
