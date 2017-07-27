import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http'
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { merge } from 'ramda';
import { MatchingProfile } from '../../interfaces';
import {Base64EncodedString} from 'aws-sdk/clients/elastictranscoder';

@Injectable()
export class MatchingService {

  private _matchingProfileKey = new BehaviorSubject<{ [key: string]: { [key: number]: string } }>({});
  private _matchingProfile = new BehaviorSubject<MatchingProfile>(this.defaultMatchingProfile());
  private _matchingProfiles = new BehaviorSubject<MatchingProfile[]>([]);
  private _currentPage = new BehaviorSubject<keyof MatchingProfile>(null);
  private index = 0;
  private keys: Array<keyof MatchingProfile> = [];

  constructor(private http: Http) {
    this.getKeys();
    this.getMatchingProfiles();
  }

  public patchMatchingProfile(matchingProfile: MatchingProfile) {
    const token = localStorage.getItem('authToken');
    const headers = new Headers();
    headers.append('authorization', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:3000/api/v1/matches', matchingProfile, options)
    .map(res => res.json())
    .flatMap((response: MatchingProfile) => {
      this._matchingProfile.next(response);
      return Observable.of(response);
    })
  }

  public get matchingProfile(): Observable<MatchingProfile> {
    return this._matchingProfile.asObservable();
  }

  public get matchingProfiles(): Observable<MatchingProfile[]> {
    return this._matchingProfiles.asObservable();
  }

  public get matchingProfileKey(): Observable<{ [key: string]: { [key: number]: string } }> {
    return this._matchingProfileKey.asObservable();
  }

  public get currentPage(): Observable<keyof MatchingProfile> {
    return this._currentPage.asObservable();
  }

  public nextPage(): void {
    this.index++;
    this.index = this.index % this.keys.length;
    this.publishCurrentPage();
  }

  public previousPage(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.keys.length - 1 - this.index;
    }
    this.publishCurrentPage();
  }

  public loadMatchingProfile(id: string): void {
    this.http.get(`http://localhost:3000/api/v1/matching/${id}`, this.getAuthOptions())
    .map(response => response.json())
    .subscribe((mp: MatchingProfile) => {
      this._matchingProfile.next(mp);
    })
  }

  private publishCurrentPage() {
    this._currentPage.next(this.keys[this.index]);
  }

  private getMatchingProfiles() {
    this.http.get('http://localhost:3000/api/v1/matching', this.getAuthOptions())
    .map(response => response.json())
    .subscribe((mps: MatchingProfile[]) => {
      this._matchingProfiles.next(mps);
    })
  }

  private getAuthOptions(): RequestOptions {
    const token = localStorage.getItem('authToken');
    const headers = new Headers();
    headers.append('authorization', token);
    return new RequestOptions({ headers: headers });
  }

  private defaultMatchingProfile(): MatchingProfile {
    return { }
  }

  private getKeys() {
    this.http.get('http://localhost:3000/api/v1/matching/keyValues')
    .map(response => response.json())
    .subscribe(response => {
      this.keys = Reflect.ownKeys(response).map(key => key.toString()) as Array<keyof MatchingProfile>;
      this._matchingProfileKey.next(response);
      this.publishCurrentPage();
    });
  }
}
