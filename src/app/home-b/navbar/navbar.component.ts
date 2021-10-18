import { Component, OnInit } from '@angular/core';
import { MixpanelService } from 'src/app/services/mixpanel.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private mixpanelService: MixpanelService,) { }

  ngOnInit(): void {
  }

  track() {
    this.mixpanelService.goToEarlyAccess({location: 'navbar'});
  }

}
