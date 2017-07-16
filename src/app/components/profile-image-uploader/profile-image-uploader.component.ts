import { MdDialogRef } from '@angular/material';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ResizingCroppingImagesComponent } from 'angular2-resizing-cropping-image';

@Component({
  selector: 'app-profile-image-uploader',
  templateUrl: './profile-image-uploader.component.html',
  styleUrls: ['./profile-image-uploader.component.scss']
})
export class ProfileImageUploaderComponent implements OnInit {

  @ViewChild('_img') img: ResizingCroppingImagesComponent;

  constructor(private profileService: ProfileService, public dialogRef: MdDialogRef<ProfileImageUploaderComponent>, ) {
  }

  ngOnInit() {
    this.img.sizeH = 400;
    this.img.sizeW = 400;
  }

  uploadPicture() {
    this.profileService.addAvatar(this.img.imgCrop)
    .subscribe(
      () => {
        this.dialogRef.close();
      },
      (error) => {
        console.error('wtf?', error);
      }
    );
  }

}
