import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-faq-button',
  templateUrl: './faqbutton.component.html',
  styleUrls: ['./faqbutton.component.scss']
})
export class FaqButtonComponent implements OnInit {
  config: MdDialogConfig;

  constructor(public dialog: MdDialog) {
    this.config = new MdDialogConfig();
    this.config.disableClose = true
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FaqDialogComponent);
  }

}

@Component({
  selector: 'app-faq-dialog',
  templateUrl: './faqdialog.component.html',
  styleUrls: ['./faqdialog.component.scss']
})
export class FaqDialogComponent implements OnInit {
  constructor(public dialogRef: MdDialogRef<FaqDialogComponent>) { }

  ngOnInit() {
  }

}
