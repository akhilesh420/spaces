import { MixpanelService } from './../services/mixpanel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
  }

  clickEmail() {
    this.mixpanelService.clickEmail({location: "home page"});
  }

  clickInstagram() {
    this.mixpanelService.clickInstagram();
  }
}
