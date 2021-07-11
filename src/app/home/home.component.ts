import { MixpanelService } from './../services/mixpanel.service';
import { WindowService } from './../services/window.service';
import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  startIntro: Boolean = false;
  offset = 16;

  constructor(private sharedService: SharedService,
              private windowService: WindowService,
              private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
    this.startIntro = this.sharedService.startIntro;
  }

  scrollDown() {
    window.scrollTo({
      top: this.windowService.height - this.offset,
      left: 0,
      behavior: 'smooth'
    })
  }

  clickEmail() {
    this.mixpanelService.clickEmail();
  }

  clickInstagram() {
    this.mixpanelService.clickInstagram();
  }

}
