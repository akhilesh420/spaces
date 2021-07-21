import { MixpanelService } from './../services/mixpanel.service';
import { WindowService } from './../services/window.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  offset = 16;

  constructor(private windowService: WindowService,
              private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
  }

  scrollDown() {
    window.scrollTo({
      top: this.windowService.height - this.offset,
      left: 0,
      behavior: 'smooth'
    })
  }

  clickEmail() {
    this.mixpanelService.clickEmail({location: "home page"});
  }

  clickInstagram() {
    this.mixpanelService.clickInstagram();
  }

}
