import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-terms-button',
  templateUrl: './termsbutton.component.html',
  styleUrls: ['./termsbutton.component.scss']
})
export class TermsButtonComponent implements OnInit {
  config: MdDialogConfig;

  constructor(public dialog: MdDialog) {
    this.config = new MdDialogConfig();
    this.config.disableClose = true
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(TermsDialogComponent);
  }

}

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './termsdialog.component.html',
  styleUrls: ['./termsdialog.component.scss']
})
export class TermsDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<TermsDialogComponent>) { }

  ngOnInit() {
  }

}
