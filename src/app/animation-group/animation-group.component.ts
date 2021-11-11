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
  private segment: [number, number] = [30, 90];

  pinterest: AnimationOptions = {path: 'assets/Lottie animations/Pinterest/pinterest-3713687.json'};
  instagram: AnimationOptions = {path: 'assets/Lottie animations/Instagram/instagram-3713696.json'};
  twitter: AnimationOptions = {path: 'assets/Lottie animations/Twitter/twitter-3713693.json'};
  youtube: AnimationOptions = {path: 'assets/Lottie animations/Youtube/youtube-3713694.json'};
  behance: AnimationOptions = {path: 'assets/Lottie animations/Behance/behance-3713689.json'};
  tiktok: AnimationOptions = {path: 'assets/Lottie animations/Tiktok/tiktok-3713691.json'}; 

  // pinterest: AnimationOptions = {path: 'assets/Lottie animations/Pinterest/pinterest-3713687.json',initialSegment: this.intialSegment, autoplay: false, loop: false};
  // instagram: AnimationOptions = {path: 'assets/Lottie animations/Instagram/instagram-3713696.json',initialSegment: this.intialSegment, autoplay: false, loop: false};
  // twitter: AnimationOptions = {path: 'assets/Lottie animations/Twitter/twitter-3713693.json', initialSegment: this.intialSegment, autoplay: false, loop: false};
  // youtube: AnimationOptions = {path: 'assets/Lottie animations/Youtube/youtube-3713694.json', initialSegment: this.intialSegment, autoplay: false, loop: false};
  // behance: AnimationOptions = {path: 'assets/Lottie animations/Behance/behance-3713689.json', initialSegment: this.intialSegment, autoplay: false, loop: false};
  // tiktok: AnimationOptions = {path: 'assets/Lottie animations/Tiktok/tiktok-3713691.json', initialSegment: this.intialSegment, autoplay: true, loop: false}; 


  private animationItems: {name: string, animationItem: AnimationItem}[] = [];
  private counter = 0;
  private count = 0;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  animationCreated(animationItem: AnimationItem, name: string): void {
    this.animationItems.push({name: name, animationItem: animationItem});
    // animationItem.setSpeed(2);
  }

  onComplete(event) {
    ++this.counter;
    const index = this.counter % this.animationItems.length;
    this.ngZone.runOutsideAngular(() => {
      const segment = this.counter < this.animationItems.length ? this.intialSegment : this.segment;
      this.animationItems[index].animationItem.playSegments(segment, true);
    });
  }

  onFrameChange(event) {
    ++this.count;
    console.log(this.count);
  }
}
