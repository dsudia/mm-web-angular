import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { Educator, School} from '../../interfaces'

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  getProfile() {
    const token = localStorage.getItem('authToken');
    const memberType = Number(localStorage.getItem('memberType'));

    const headers = new Headers();
    headers.append('authorization', token);
    const options = new RequestOptions({ headers: headers });

    let endpoint: string;
    switch (memberType) {
      case 1:
        endpoint = '/api/v1/educators/me';
        break;
      case 2:
        endpoint = '/api/v1/schools/me';
        break;
    }

    return this.http.get(endpoint, options).toPromise()
    .then(response => {
      let profile = response.json()[0];
      switch (memberType) {
      case 1:
        profile = (<Educator> profile);
        break;
      case 2:
        profile = (<School> profile);
        break;
      }
      return profile;
    })
    .catch(() => {
      return null;
    })
  }

  createProfile(profile: Educator | School) {
    const token = localStorage.getItem('authToken');
    const memberType = Number(localStorage.getItem('memberType'));

    const headers = new Headers();
    headers.append('authorization', token);
    const options = new RequestOptions({ headers: headers });

    let endpoint: string;
    switch (memberType) {
      case 1:
        endpoint = '/api/v1/educators/me';
        break;
      case 2:
        endpoint = '/api/v1/schools/me';
        break;
    }

    return this.http.post(endpoint, profile, options).toPromise()
      .then(response => {
        let resProfile = response.json();
        switch (memberType) {
          case 1:
            resProfile = (<Educator> profile);
            break;
          case 2:
            resProfile = (<School> profile);
            break;
        }
        return profile;
      })
  }
}
