import { BehaviorSubject } from 'rxjs';
import { WindowService } from './../services/window.service';
import { Component, NgZone, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-animation-group',
  templateUrl: './animation-group.component.html',
  styleUrls: ['./animation-group.component.css']
})
export class AnimationGroupComponent implements OnInit {  

  // pinterest: AnimationOptions = {path: 'assets/Lottie animations/Pinterest/pinterest-3713687.json'};
  // instagram: AnimationOptions = {path: 'assets/Lottie animations/Instagram/instagram-3713696.json'};
  // twitter: AnimationOptions = {path: 'assets/Lottie animations/Twitter/twitter-3713693.json'};
  // youtube: AnimationOptions = {path: 'assets/Lottie animations/Youtube/youtube-3713694.json'};
  // behance: AnimationOptions = {path: 'assets/Lottie animations/Behance/behance-3713689.json'};
  // tiktok: AnimationOptions = {path: 'assets/Lottie animations/Tiktok/tiktok-3713691.json'}; 

  animationCount:number = 6;
  playAnimation: boolean = false;
  pinterest: AnimationOptions = {path: 'assets/Lottie animations/Pinterest/pinterest-3713687.json', autoplay: false, loop: false};
  instagram: AnimationOptions = {path: 'assets/Lottie animations/Instagram/instagram-3713696.json', autoplay: false, loop: false};
  twitter: AnimationOptions = {path: 'assets/Lottie animations/Twitter/twitter-3713693.json', autoplay: false, loop: false};
  youtube: AnimationOptions = {path: 'assets/Lottie animations/Youtube/youtube-3713694.json', autoplay: false, loop: false};
  behance: AnimationOptions = {path: 'assets/Lottie animations/Behance/behance-3713689.json', autoplay: false, loop: false};
  tiktok: AnimationOptions = {path: 'assets/Lottie animations/Tiktok/tiktok-3713691.json', autoplay: false, loop: false}; 


  private animationItems: {name: string, animationItem: AnimationItem}[] = [];

  @ViewChild('container') container: ElementRef<HTMLElement>;


  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem, name: string): void {
    this.animationItems.push({name: name, animationItem: animationItem});
    if (this.playAnimation) this.animationPlay();
  }

  @HostListener('window:scroll', ['$event']) //Vertical scroll
  onWindowScroll($event) {
    const top = this.container.nativeElement.getBoundingClientRect().top;
    const height = this.container.nativeElement.offsetHeight;
    const percentage = 0.8;
    const windowHeight = this.windowService.height;
    if (top <=  windowHeight * percentage && top >= -height * percentage) this.animationPlay(); 
  }

  animationPlay() {
    this.playAnimation = true;
    if (this.animationItems.length === this.animationCount) this.animationItems.forEach(animation => animation.animationItem.play());
  }
}
