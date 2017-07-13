import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http'
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { merge } from 'ramda';

import { Educator, EducatorBasics, School, SchoolBasics} from '../../interfaces'

@Injectable()
export class ProfileService {

  private _profile = new BehaviorSubject<Educator | School>(this.defaultProfile())

  constructor(private http: Http) { }

  private defaultProfile(): School {
    return {
      memberType: 0,
      name: '',
      id: '',
    }
  }

  get profile(): Observable<Educator | School> {
    return this._profile.asObservable();
  }

  getProfile() {
    const token = localStorage.getItem('authToken');
    const memberType = Number(localStorage.getItem('memberType'));

    const headers = new Headers();
    headers.append('authorization', token);
    const options = new RequestOptions({ headers: headers });

    let endpoint: string;
    switch (memberType) {
      case 1:
        endpoint = 'http://localhost:3000/api/v1/educators/me';
        break;
      case 2:
        endpoint = 'http://localhost:3000/api/v1/schools/me';
        break;
    }

    return this.http.get(endpoint, options)
    .map(res => res.json())
    .flatMap((response) => {
      this._profile.next(merge({ memberType: Number(localStorage.getItem('memberType')) }, response));
      return Observable.of(response);
    })
    .catch(error => {
      this._profile.next(merge(this.defaultProfile(), { memberType: Number(localStorage.getItem('memberType')) }));
      return Observable.of({});
    });
  }

  private patchProfile(uri, profile) {
    const token = localStorage.getItem('authToken');
    const headers = new Headers();
    headers.append('authorization', token);
    const options = new RequestOptions({ headers: headers });

    return this.http.put(uri, profile, options).map(res => res.json())
      .flatMap((response: Educator | School) => {
        this._profile.next(merge({ memberType: Number(localStorage.getItem('memberType')) }, response));
        return Observable.of(response);
      })
  }

  patchEducatorProfile(profile: EducatorBasics) {
    return this.patchProfile('http://localhost:3000/api/v1/educators/me', profile);
  }

  patchSchoolProfile(profile: SchoolBasics) {
    return this.patchProfile('http://localhost:3000/api/v1/schools/me', profile);
  }
}

export function isEducator(profile: Educator | School): profile is Educator {
  return profile.memberType === 1;
}
