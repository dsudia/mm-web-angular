import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http'
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { merge } from 'ramda';
import { Educator, EducatorBasics, School, SchoolBasics } from '../../interfaces';
import { Base64EncodedString } from 'aws-sdk/clients/elastictranscoder';

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
    .catch(() => {
      this._profile.next(merge(this.defaultProfile(), { memberType: Number(localStorage.getItem('memberType')) }));
      return Observable.of({});
    });
  }

  private patchProfile(uri: string, profile: EducatorBasics | SchoolBasics) {
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

  addAvatar(pngAs64: Base64EncodedString) {
    const token = localStorage.getItem('authToken');
    const headers = new Headers();
    headers.set('authorization', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/api/v1/avatars/sign', options)
    .map(response => response.json())
    .flatMap(response => {
      const buffer = new Buffer(pngAs64.split(',')[1], 'base64');
      const file = new File([buffer], response.fileName);
      return new Observable(observer => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', response.signedRequest);
        xhr.setRequestHeader('Content-Type', 'image/png');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              observer.next(response.url)
            } else {
              observer.error(xhr.statusText)
            }
          }
        };
        xhr.send(file);
      })
    })
    .flatMap((avatarUrl: string) => {
      if (isEducator(this._profile.getValue())) {
        return this.patchEducatorProfile({ avatarUrl })
      } else {
        return this.patchSchoolProfile({ avatarUrl })
      }
    });
  }
}

export function isEducator(profile: Educator | School): profile is Educator {
  return profile.memberType === 1;
}
