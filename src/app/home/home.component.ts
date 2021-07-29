import { SharedService } from './../services/shared.service';
import { MixpanelService } from './../services/mixpanel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  template: string;

  constructor(private mixpanelService: MixpanelService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.template = this.sharedService.getTemplate();
  }

  clickEmail() {
    this.mixpanelService.clickEmail({location: "home page"});
  }

  clickInstagram() {
    this.mixpanelService.clickInstagram();
  }
}
