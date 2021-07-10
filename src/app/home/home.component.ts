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
              private windowService: WindowService) { }

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

}
