import { MatchingProfileEditorComponent } from './../matching-profile-editor/matching-profile-editor.component';

import { Subscription } from 'rxjs/Rx';
import { MdDialog } from '@angular/material';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatchingService } from './../../services/matching/matching.service';
import { CreateEducatorProfileFormDialogComponent } from './../create-educator-profile-form/create-educator-profile-form.component';
import { CreateSchoolProfileFormDialogComponent } from './../create-school-profile-form/create-school-profile-form.component';
import { ProfileImageUploaderComponent } from './../profile-image-uploader/profile-image-uploader.component';
import { ProfileService, isEducator } from '../../services/profile/profile.service';
import { Educator, School, MatchingProfile } from '../../interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  private profile: Educator | School;
  private myMatchingProfiles: MatchingProfile[];
  private profileSubscription: Subscription;
  private matchingSubscription: Subscription;

  constructor(
      private profileService: ProfileService,
      private matchingService: MatchingService,
      public dialog: MdDialog,
      private cd: ChangeDetectorRef) {
    this.profileSubscription = this.profileService.profile.subscribe(this.updateProfile.bind(this));
    this.matchingSubscription = this.matchingService.matchingProfiles.subscribe((profiles: MatchingProfile[]) => {
      this.myMatchingProfiles = profiles;
      this.cd.markForCheck();
    })
  }

  private updateProfile(profile: any) {
    this.profile = profile;
    this.cd.markForCheck();
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(() => {
      this.openProfileForEditingIfNeeded();
    });
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }

  openProfileForEditingIfNeeded() {
    if (this.profile.memberType !== 0 && !this.profileComplete()) {
      this.editProfile();
    }
  }

  editProfile() {
    if (isEducator(this.profile)) {
      const dialogRef = this.dialog.open(CreateEducatorProfileFormDialogComponent, {
        width: '50%',
        height: '70%',
        disableClose: true
      });
      dialogRef.componentInstance.profile = this.profile;
    } else {
      const dialogRef = this.dialog.open(CreateSchoolProfileFormDialogComponent, {
        width: '50%',
        height: '70%',
        disableClose: true
      });
      dialogRef.componentInstance.profile = this.profile;
    }
  }

  editMatchingProfile({ id }: MatchingProfile) {
    this.matchingService.loadMatchingProfile(id);
    this.openMatchingProfileEdit();
  }

  editProfilePicture() {
    const dialogRef = this.dialog.open(ProfileImageUploaderComponent, {
      width: '80%',
      height: '80%',
      disableClose: false
    });
  }

  newMatchingProfile() {
    this.matchingService.createMatchingProfile();
    this.openMatchingProfileEdit();
  }

  private openMatchingProfileEdit() {
    const dialogRef = this.dialog.open(MatchingProfileEditorComponent, {
      width: '50%',
      height: '70%',
    });
  }

  profileComplete() {
    if (this.profile.memberType === 1 || this.profile.memberType === 2) {
      if (isEducator(this.profile)) {
        return this.profile.firstName && this.profile.lastName && this.profile.description;
      } else {
        return this.profile.name && this.profile.description;
      }
    }
    return false;
  }
}
