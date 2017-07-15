import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Router } from '@angular/router'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class AuthService {

  loggedIn: boolean

  constructor(private http: Http, private router: Router) {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    const token = localStorage.getItem('authToken');

    if (token) {
      this.loggedIn = true;
      return;
    }
    this.loggedIn = false;
  }

  sendRegistration(email: string, password: string, memberType: number) {
    return this.http.post('http://localhost:3000/api/v1/auth', {
      email,
      password,
      memberType
    })
    .toPromise()
    .then(response => {
      const body = response.json();
      localStorage.setItem('authToken', body.authToken);
      localStorage.setItem('memberType', body.memberType);
      this.loggedIn = true
    })
    .catch(err => {
      throw err;
    })
  }

  login(email: string, password: string) {
    return this.http.get(`http://localhost:3000/api/v1/auth?email=${email}&password=${password}`)
    .toPromise()
    .then(response => {
      const body = response.json();
      localStorage.setItem('authToken', body.authToken);
      localStorage.setItem('memberType', body.memberType);
      this.loggedIn = true;
    })
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
  }
}
