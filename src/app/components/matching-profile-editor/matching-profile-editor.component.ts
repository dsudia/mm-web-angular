import { MdDialogRef } from '@angular/material';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MatchingProfile, Educator, School } from './../../interfaces';
import { MatchingService } from './../../services/matching/matching.service';
import { ProfileService } from './../../services/profile/profile.service';

interface Meta {
  [key: string]: {
    description: String;
    school?: {
      min?: number;
      max?: number;
    },
    educator?: {
      min?: number;
      max: number;
    }
  }
}

interface InvalidCheckboxes {
  count: number;
  min: number;
  max: number;
  tooLow: boolean;
}

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
  private memberType: 'educator' | 'school';
  private profileSubscription: Subscription;
  private meta: Meta = {
    ageRanges: {
      description: 'Age Ranges Description',
    },
    calendars: {
      description: 'Calendar Description',
      school: {
        max: 1,
      }
    },
    organizationTypes: {
      description: 'Organization Types Description',
    },
    locationTypes: {
      description: 'Location Types Description',
      school: {
        max: 1
      }
    },
    educationTypes: {
      description: 'Education Types Description',
      educator: {
        max: 1,
      }
    },
    sizes: {
      description: 'Sizes Types Description',
      school: {
        max: 1,
      }
    },
    trainingTypes: {
      description: 'Trainings description',
    },
    traits: {
      description: 'Traits description',
      school: {
        min: 7,
        max: 7,
      },
      educator: {
        min: 7,
        max: 7,
      }
    }
  }

  constructor(
      private dialogRef: MdDialogRef<MatchingProfileEditorComponent>,
      private matchingService: MatchingService,
      private profileService: ProfileService,
      private cd: ChangeDetectorRef,
      private fb: FormBuilder) {
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
    });
    this.profileSubscription = this.profileService.profile.subscribe(profile => {
      switch (profile.memberType) {
        case 1: return this.memberType = 'educator';
        case 2: return this.memberType = 'school';
      }
    });
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
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  saveChanges() {
    this.matchingService.patchProfile();
    this.dialogRef.close();
  }

  discardChanges() {
    this.dialogRef.close();
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
    this.cd.markForCheck();
    this.form.statusChanges.subscribe(() => {
      const checkedNumber = (<FormArray>this.form.controls.selections).controls
      .map((control, index) => {
        return control.value ? index + 1 : undefined;
      })
      .filter(value => value !== undefined);
      this.matchingService.patchArray(checkedNumber);
      this.cd.markForCheck();
    });
  }

  buildSelection() {
    const currentSection = this.matchingProfileKey[this.currentPage];
    const sortedKeys = Reflect.ownKeys(currentSection).sort();
    const array = sortedKeys.map((key, index) =>
      (<number[]>this.matchingProfile[this.currentPage]).includes(index + 1))
    .map(object => this.fb.control(object));
    return this.fb.array(array);
  }

  checkNumberOfBoxesSelected(): 0 | InvalidCheckboxes {
    if (this.form) {
      const count = (<FormArray>this.form.controls.selections).controls.reduce((sum, control) => {
        return control.value ? sum + 1 : sum;
      }, 0);
      const memberMeta = this.meta[this.currentPage][this.memberType];
      const min = memberMeta && memberMeta.min ? memberMeta.min : 1;
      const max = memberMeta && memberMeta.max ? memberMeta.max : undefined;
      if (count < min) {
        return {
          count,
          min,
          max,
          tooLow: true,
        };
      } else if (max && count > max) {
        return {
          count,
          min,
          max,
          tooLow: false,
        };
      }
    }
    return 0;
  }

  helperMessage() {
    const isValid = this.checkNumberOfBoxesSelected();
    function plural(count: number, word: string) {
      return count === 1 ? word : `${word}s`;
    }
    if (isValid === 0) {
      return 'Looks great!';
    }
    if (isValid.tooLow) {
      return `you must make at least ${isValid.min} ${plural(isValid.min, 'selection')},`
          + ` please choose ${isValid.min - isValid.count} more`;
    } else {
      return `you may only make ${isValid.max} ${plural(isValid.max, 'selection')},`
          + ` please select ${isValid.count - isValid.max} fewer`;
    }
  }
}
