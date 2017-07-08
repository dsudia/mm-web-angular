import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-profile-form-button',
  templateUrl: './create-profile-form-button.component.html',
  styleUrls: ['./create-profile-form-button.component.scss']
})
export class CreateProfileFormButtonComponent implements OnInit {
  config: MdDialogConfig;

  constructor(public dialog: MdDialog) {
    this.config = new MdDialogConfig();
    this.config.disableClose = true
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateProfileFormDialogComponent);
  }

}

@Component({
  selector: 'app-create-profile-form-dialog',
  templateUrl: './create-profile-form-dialog.component.html',
  styleUrls: ['./create-profile-form-dialog.component.scss']
})
export class CreateProfileFormDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<CreateProfileFormDialogComponent>) { }

  formErrors = {
    firstName: '',
    lastName: '',
    description: '',
  }

  ngOnInit() {
  }

}
