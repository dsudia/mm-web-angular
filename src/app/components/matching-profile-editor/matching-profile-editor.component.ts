import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MatchingProfile } from './../../interfaces';
import { MatchingService } from './../../services/matching/matching.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-matching-profile-editor',
  templateUrl: './matching-profile-editor.component.html',
  styleUrls: ['./matching-profile-editor.component.scss']
})
export class MatchingProfileEditorComponent implements OnInit, OnDestroy {
  private form: FormGroup;
  private matchingProfileKey: { [key: string]: { [key: number]: string } };
  private matchingProfile: MatchingProfile;
  private matchingProfileSubscription: Subscription;
  private currentPage: keyof MatchingProfile;
  private currentPageSubscription: Subscription;

  constructor(private matchingService: MatchingService, private cd: ChangeDetectorRef, private fb: FormBuilder) {
    this.matchingService.matchingProfileKey.takeWhile(keys => {
      this.matchingProfileKey = keys;
      this.buildForm();
      return Reflect.ownKeys(keys).length === 0;
    }).subscribe(keys => undefined);
    this.matchingProfileSubscription = this.matchingService.matchingProfile.subscribe(mp => {
      this.matchingProfile = mp;
      this.buildForm();
    });
    this.currentPageSubscription = this.matchingService.currentPage.subscribe(cp => {
      this.currentPage = cp;
      this.buildForm();
    })
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    if (this.matchingProfileSubscription) {
      this.matchingProfileSubscription.unsubscribe();
    }
    if (this.currentPageSubscription) {
      this.currentPageSubscription.unsubscribe();
    }
  }

  buildForm() {
    if (this.matchingProfile && Reflect.ownKeys(this.matchingProfile).length > 0 && this.currentPage) {
      this.form = this.fb.group({
        selections: this.buildSelection(),
      });
    } else {
      this.form = this.fb.group({
        selections: this.fb.array([]),
      });
    }
    console.log(this.matchingProfileKey[this.currentPage])
    this.cd.markForCheck();
  }

  buildSelection() {
    const currentSection = this.matchingProfileKey[this.currentPage];
    const sortedKeys = Reflect.ownKeys(currentSection).sort();
    const array = sortedKeys.map((key, index) =>
      (<number[]>this.matchingProfile[this.currentPage]).includes(index))
    .map(object => this.fb.control(object));
    return this.fb.array(array);
  }
}
