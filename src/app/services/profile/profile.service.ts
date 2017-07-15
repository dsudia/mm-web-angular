import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http'
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { merge } from 'ramda';

import { Educator, EducatorBasics, School, SchoolBasics} from '../../interfaces'
import {Base64EncodedString} from "aws-sdk/clients/elastictranscoder";

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
        endpoint = '/api/v1/educators/me';
        break;
      case 2:
        endpoint = '/api/v1/schools/me';
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
    return this.patchProfile('/api/v1/educators/me', profile);
  }

  patchSchoolProfile(profile: SchoolBasics) {
    return this.patchProfile('/api/v1/schools/me', profile);
  }

  addAvatar(imageData: Base64EncodedString) {
    const blob = this.base64ToBlob(imageData, 'image/jpeg');
    const token = localStorage.getItem('authToken');
    const headers = new Headers();
    headers.append('authorization', token);
    headers.append('Content-Type', 'multipart/form-data');
    const options = new RequestOptions({ headers: headers });
    const form = new FormData();
    // form.append('avatar', imageData, 'avatar.jpeg');

    return this.http.post('/api/v1/avatars', form, options).subscribe()
    // .map(res => {
    //   console.log(res);
    //   return res.json();
    // })
    //   .flatMap((response: Educator | School) => {
    //     console.log(response);
    //     this._profile.next(merge({ memberType: Number(localStorage.getItem('memberType')) }, response));
    //     return Observable.of(response);
    //   })
  }

  base64ToBlob(base64Data: string, contentType: string, sliceSize?: number) {
    console.log(base64Data);

    let byteCharacters,
      byteArray,
      byteNumbers,
      blobData,
      blob;

    contentType = contentType || '';

    byteCharacters = atob(base64Data);

    // Get blob data sliced or not
    blobData = sliceSize ? getBlobDataSliced() : getBlobDataAtOnce();

    blob = new Blob(blobData, { type: contentType });

    return blob;


    /*
     * Get blob data in one slice.
     * => Fast in IE on new Blob(...)
     */
    function getBlobDataAtOnce() {
      byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      byteArray = new Uint8Array(byteNumbers);

      return [byteArray];
    }

    /*
     * Get blob data in multiple slices.
     * => Slow in IE on new Blob(...)
     */
    function getBlobDataSliced() {

      let slice;
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        slice = byteCharacters.slice(offset, offset + sliceSize);

        byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        byteArray = new Uint8Array(byteNumbers);

        // Add slice
        byteArrays.push(byteArray);
      }

      return byteArrays;
    }
  }
}

export function isEducator(profile: Educator | School): profile is Educator {
  return profile.memberType === 1;
}
