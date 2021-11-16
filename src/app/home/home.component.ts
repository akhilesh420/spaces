import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  landingOption: AnimationOptions = {path: 'assets/Landing animation/Landing Animation.json'};
  @ViewChild('animation') animation: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  play() {
    this.animation.nativeElement.play()
      .catch(() => console.log('fuck'));
  }

}
