import { SharedService } from './../../services/shared.service';
import { MixpanelService } from './../../services/mixpanel.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-banner',
  templateUrl: './sign-up-banner.component.html',
  styleUrls: ['./sign-up-banner.component.css']
})
export class SignUpBannerComponent implements OnInit {

  @Input() location: String;
  earlyCount: BehaviorSubject<number>;
  // earlyCount = new Observable((observer) => observer.next(0));

  constructor(private mixpanelService: MixpanelService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.earlyCount = this.sharedService.getUserCount();
  }

  track() {
    this.mixpanelService.goToEarlyAccess({location: this.location});
  }

}
