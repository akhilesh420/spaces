import { Component, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-animation-group',
  templateUrl: './animation-group.component.html',
  styleUrls: ['./animation-group.component.css']
})
export class AnimationGroupComponent implements OnInit {

  private intialSegment: [number, number] = [0, 90];
  private segment: [number, number] = [0, 90];

  pinterest: AnimationOptions = {path: 'assets/Lottie animations/Pinterest/pinterest-3713687.json',initialSegment: this.intialSegment, autoplay: false, loop: false};
  instagram: AnimationOptions = {path: 'assets/Lottie animations/Instagram/instagram-3713696.json',initialSegment: this.intialSegment, autoplay: false, loop: false};
  twitter: AnimationOptions = {path: 'assets/Lottie animations/Twitter/twitter-3713693.json', initialSegment: this.intialSegment, autoplay: false, loop: false};
  youtube: AnimationOptions = {path: 'assets/Lottie animations/Youtube/youtube-3713694.json', initialSegment: this.intialSegment, autoplay: false, loop: false};
  behance: AnimationOptions = {path: 'assets/Lottie animations/Behance/behance-3713689.json', initialSegment: this.intialSegment, autoplay: false, loop: false};
  tiktok: AnimationOptions = {path: 'assets/Lottie animations/Tiktok/tiktok-3713691.json', initialSegment: this.segment, autoplay: true, loop: false}; 


  private animationItems: {name: string, animationItem: AnimationItem}[] = [];
  private counter = 0;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  animationCreated(animationItem: AnimationItem, name: string): void {
    this.animationItems.push({name: name, animationItem: animationItem});
  }

  onComplete(event) {
    this.counter = (this.counter + 1) % this.animationItems.length;
    console.log(this.counter);
    this.ngZone.runOutsideAngular(() => {
      this.animationItems[this.counter].animationItem.playSegments(this.segment, true);
    });
  }
}
