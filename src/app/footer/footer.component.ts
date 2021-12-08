import { Component, OnInit } from '@angular/core';
import { MixpanelService } from '../services/mixpanel.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private mixpanelService: MixpanelService) { }

  ngOnInit(): void {
}

  clickEmail() {
    return;
    this.mixpanelService.clickEmail({location: "home page"});
  }

  clickInstagram() {
    return;
    this.mixpanelService.clickInstagram();
  }

}
