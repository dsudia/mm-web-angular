import { Injectable } from '@angular/core';
import { fromJS, List, Map } from 'immutable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Educator, MatchingProfile, School, UserState } from '../../interfaces'

@Injectable()
export class UserDataService {
    private _defaultState: Map<string, any> = fromJS({
        memberType: '',
        profile: null
    });

    private _userState: BehaviorSubject<Map<string, any>> = new BehaviorSubject(this._defaultState);

    constructor() {}
}
