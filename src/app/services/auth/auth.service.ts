import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  sendRegistration(email: string, password: string, memberType: number) {
    return this.http.post('http://localhost:3001/api/v1/auth', {
      email,
      password,
      memberType
    })
    .toPromise()
    .then(response => {
      const token = response.json().authToken
      localStorage.setItem('authToken', token)
    });
  }

  login(email: string, password: string) {
    return this.http.get(`http://localhost:3001/api/v1/auth?email=${email}&password=${password}`)
    .toPromise()
    .then(response => {
      const token = response.json().authToken
      localStorage.setItem('authToken', token)
    })
  }
}
