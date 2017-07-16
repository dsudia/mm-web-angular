
import { Subscription } from 'rxjs/Rx';
import { MdDialog } from '@angular/material';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { CreateEducatorProfileFormDialogComponent } from './../create-educator-profile-form/create-educator-profile-form.component';
import { CreateSchoolProfileFormDialogComponent } from './../create-school-profile-form/create-school-profile-form.component';
import { ProfileImageUploaderComponent } from './../profile-image-uploader/profile-image-uploader.component';
import { ProfileService, isEducator } from '../../services/profile/profile.service';
import { Educator, School } from '../../interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: Educator | School;
  profileSubscription: Subscription;

  constructor(private profileService: ProfileService, public dialog: MdDialog, private cd: ChangeDetectorRef) {
    this.profileSubscription = this.profileService.profile.subscribe(this.updateProfile.bind(this));
  }

  private updateProfile(profile) {
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

  editProfilePicture() {
    const dialogRef = this.dialog.open(ProfileImageUploaderComponent, {
      width: '80%',
      height: '80%',
      disableClose: false
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
