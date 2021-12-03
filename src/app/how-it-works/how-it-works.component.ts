import { WindowService } from './../services/window.service';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren, HostListener, QueryList } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  
  activePosition: number = 0;
  timeout: NodeJS.Timeout;
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;
  @ViewChildren('video') videos: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.videos.forEach(video => video.nativeElement.pause());
  }

  @HostListener('window:scroll', ['$event']) //Vertical scroll
  onWindowScroll($event) {
    this.videoState()
  }

  videoState() {
    if (!this.getVideo(this.activePosition).nativeElement.duration) return;
    const top = this.scrollContainer.nativeElement.getBoundingClientRect().top;
    const height = this.scrollContainer.nativeElement.offsetHeight;
    const windowHeight = this.windowService.height;
    if (top <=  windowHeight * 0.9 && top >= -height*0.9) {
      this.getVideo(this.activePosition).nativeElement.play();
    } else {
      this.getVideo(this.activePosition).nativeElement.pause();
    }
  }

  playAnimation(position: number) { //Horizontal scroll
    if (!this.scrollContainer) return;
    this.activePosition = position;
    const width = this.scrollContainer.nativeElement.offsetWidth;
    this.scrollContainer.nativeElement.scrollTo({
      top: 0,
      left: width * position,
      behavior: 'smooth'
    });
    this.videos.forEach(video => video.nativeElement.pause());
    setTimeout(() => this.getVideo(this.activePosition).nativeElement.play(), 300);
  }

  onEnded() {
    this.incrementPosition();
    this.playAnimation(this.activePosition);
  }

  onPlay() {
    const currentTime = this.getVideo(this.activePosition).nativeElement.currentTime;
    const duration = this.getVideo(this.activePosition).nativeElement.duration;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.onEnded(), (duration - currentTime) * 1000);
  }

  incrementPosition() {
    this.activePosition = (this.activePosition + 1) % 3;
  }

  getVideo(value: number) {
    return this.videos.filter((element, index) => index === value)[0];
  }
}
