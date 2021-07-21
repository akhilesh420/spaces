import { Component, OnInit } from '@angular/core';
import { MixpanelService } from 'src/app/services/mixpanel.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
  }

  clickEmail() {
    this.mixpanelService.clickEmail({location: "message page"});
  }

  clickInstagram() {
    this.mixpanelService.clickInstagram();
  }
}
