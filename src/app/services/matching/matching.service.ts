import { PleaseWaitService } from './../please-wait/please-wait.service';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http'
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { merge, pick } from 'ramda';
import { MatchingProfile } from '../../interfaces';
import {Base64EncodedString} from 'aws-sdk/clients/elastictranscoder';

@Injectable()
export class MatchingService {

  private _matchingProfileKey = new BehaviorSubject<{ [key: string]: { [key: number]: string } }>({});
  private _matchingProfile = new BehaviorSubject<MatchingProfile>(this.defaultMatchingProfile());
  private _matchingProfiles = new BehaviorSubject<MatchingProfile[]>([]);
  private _currentPage = new BehaviorSubject<keyof MatchingProfile>(null);
  private backup: MatchingProfile;
  private index = 0;
  private keys: Array<keyof MatchingProfile> = [];

  constructor(private http: Http, private pleaseWaitService: PleaseWaitService) {
    this.getKeys();
    this.getMatchingProfiles();
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
      this.index = this.keys.length + this.index;
    }
    this.publishCurrentPage();
  }

  public loadMatchingProfile(id: string): void {
    this.pleaseWaitService.startWaiting();
    this.http.get(`http://localhost:3000/api/v1/matching/${id}`, this.getAuthOptions())
    .map(response => response.json())
    .subscribe((mp: MatchingProfile) => {
      this.backup = mp;
      this._matchingProfile.next(mp);
      this.pleaseWaitService.stopWaiting();
    })
  }

  public createMatchingProfile(): void {
    this.pleaseWaitService.startWaiting();
    this._matchingProfile.next({});
    this.http.post(`http://localhost:3000/api/v1/matching`, {}, this.getAuthOptions())
    .map(response => response.json())
    .subscribe((mp: MatchingProfile) => {
      this._matchingProfile.next(mp);
      this.getMatchingProfiles();
    });
  }

  public patchArray(array) {
    this._matchingProfile.next(merge(this._matchingProfile.getValue(), { [this._currentPage.getValue()]: array }));
  }

  public patchProfile() {
    this.pleaseWaitService.startWaiting();
    const profile = this._matchingProfile.getValue();
    this.http.patch(`http://localhost:3000/api/v1/matching/${profile.id}`, profile, this.getAuthOptions())
    .map(response => response.json())
    .subscribe((mp: MatchingProfile) => {
      console.log('here???');
      this.getMatchingProfiles();
    });
  }

  public removeMatchingProfile(id): void {
    this.pleaseWaitService.startWaiting();
    if (this._matchingProfile.getValue().id === id) {
      this._matchingProfile.next({});
    }
    this.http.delete(`http://localhost:3000/api/v1/matching/${id}`, this.getAuthOptions())
    .subscribe(() => {
      this.getMatchingProfiles();
    });
  }

  private publishCurrentPage() {
    this._currentPage.next(this.keys[this.index]);
  }

  private getMatchingProfiles() {
    this.http.get('http://localhost:3000/api/v1/matching', this.getAuthOptions())
    .map(response => response.json())
    .subscribe((mps: MatchingProfile[]) => {
      this._matchingProfiles.next(mps);
      this.pleaseWaitService.stopWaiting();
    })
  }

  private getAuthOptions(): RequestOptions {
    const token = localStorage.getItem('authToken');
    const headers = new Headers();
    headers.append('Authorization', token);
    return new RequestOptions({ headers });
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
