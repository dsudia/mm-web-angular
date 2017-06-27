import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  sendRegistration(email: string, password: string, memberType: number) {
    return this.http.post('/auth', {
      email,
      password,
      memberType
    })
  }

}
