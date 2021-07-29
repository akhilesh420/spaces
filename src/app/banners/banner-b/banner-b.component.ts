import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  offset = 16;

  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
  }

  scrollDown() {
    window.scrollTo({
      top: this.windowService.height - this.offset,
      left: 0,
      behavior: 'smooth'
    })
  }

}

