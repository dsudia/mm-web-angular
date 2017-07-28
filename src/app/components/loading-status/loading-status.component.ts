import { Subscription } from 'rxjs/Rx';
import { PleaseWaitService } from './../../services/please-wait/please-wait.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-loading-status',
  templateUrl: './loading-status.component.html',
  styleUrls: ['./loading-status.component.scss']
})
export class LoadingStatusComponent implements OnInit, OnDestroy {
  private isWaiting: boolean;
  private isWaitingSubscription: Subscription;

  constructor(private pleaseWait: PleaseWaitService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.isWaitingSubscription = this.pleaseWait._isWaiting.subscribe(isWaiting => {
      this.isWaiting = isWaiting;
      this.cd.markForCheck();
    })
  }

  ngOnDestroy() {
    if (this.isWaitingSubscription) {
      this.isWaitingSubscription.unsubscribe();
    }
  }
}
