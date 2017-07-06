import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  getProfileIfExists() {
    const token = localStorage.getItem('authToken')

  }
}
