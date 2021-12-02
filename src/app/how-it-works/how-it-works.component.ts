import { WindowService } from './../services/window.service';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren, HostListener, QueryList } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  
  activePosition: number = 0;
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;
  @ViewChildren('video') videos: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.videoState();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    this.videoState()
  }

  videoState() {
    const top = this.scrollContainer.nativeElement.getBoundingClientRect().top;
    const height = this.scrollContainer.nativeElement.offsetHeight;
    const windowHeight = this.windowService.height;
    if (top <=  windowHeight * 0.9 && top >= -height*0.9) {
      this.getVideo(this.activePosition).nativeElement.play();
    } else {
      this.getVideo(this.activePosition).nativeElement.pause();
    }
  }

  scrollTo(position: number) {
    if (!this.scrollContainer) return;
    this.activePosition = position;
    const width = this.scrollContainer.nativeElement.offsetWidth;
    this.scrollContainer.nativeElement.scrollTo({
      top: 0,
      left: width * position,
      behavior: 'smooth'
    });
    this.getVideo(this.activePosition).nativeElement.play();
  }

  onEnded() {
    console.log('ended');
    this.incrementPosition();
    this.scrollTo(this.activePosition);
  }

  incrementPosition() {
    this.activePosition = (this.activePosition + 1) % 3;
  }

  getVideo(value: number) {
    return this.videos.filter((element, index) => index === value)[0];
  }
}
