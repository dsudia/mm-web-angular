import { MdDialogRef } from '@angular/material';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Bounds, ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-profile-image-uploader',
  templateUrl: './profile-image-uploader.component.html',
  styleUrls: ['./profile-image-uploader.component.scss']
})
export class ProfileImageUploaderComponent implements OnInit, AfterViewInit {

  data: any;
  cropperSettings: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;

  @ViewChild('cropper')
  cropper: ImageCropperComponent;

  constructor(
    private profileService: ProfileService,
    public dialogRef: MdDialogRef<ProfileImageUploaderComponent>
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 400;
    this.cropperSettings.height = 400;

    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 400;

    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 500;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    this.cropperSettings.noFileInput = true;

    this.cropperSettings.fileType = 'image/png'

    this.data = {};
  }

  ngAfterViewInit() {
    console.log(this.cropper)
  }

  selectEvent(file: File) {
    const image: any = new Image();
    const myReader: FileReader = new FileReader();
    console.log(this)
    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  ngOnInit() {}

  uploadEvent() {
    return this.profileService.addAvatar(this.data.image).subscribe();
  }

  cancelEvent(): void {}

}
