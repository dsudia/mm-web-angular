import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-formbutton.component.html',
  styleUrls: ['./sign-in-formbutton.component.scss']
})
export class SignInFormButtonComponent implements OnInit {
  config: MdDialogConfig;

  constructor(public dialog: MdDialog) {
    this.config = new MdDialogConfig();
    this.config.disableClose = true
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SignInFormDialogComponent);
  }

}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-formdialog.component.html',
  styleUrls: ['./sign-in-formdialog.component.scss']
})
export class SignInFormDialogComponent implements OnInit {
  email: string;
  emailError: string | boolean;
  password: string;
  passError: string | boolean;

  constructor() {
    this.email = '';
    this.emailError = '';
    this.password = '';
    this.passError = '';
  }

  ngOnInit() {
  }

}
