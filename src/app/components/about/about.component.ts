import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-about-button',
  templateUrl: './aboutbutton.component.html',
  styleUrls: ['./aboutbutton.component.scss']
})
export class AboutButtonComponent implements OnInit {
  config: MdDialogConfig;

  constructor(public dialog: MdDialog) {
    this.config = new MdDialogConfig();
    this.config.disableClose = true
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AboutDialogComponent);
  }

}

@Component({
  selector: 'app-faq-dialog',
  templateUrl: './aboutdialog.component.html',
  styleUrls: ['./aboutdialog.component.scss']
})
export class AboutDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<AboutDialogComponent>) { }

  ngOnInit() {
  }

}
