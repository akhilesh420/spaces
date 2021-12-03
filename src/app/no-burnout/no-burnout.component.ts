import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-no-burnout',
  templateUrl: './no-burnout.component.html',
  styleUrls: ['./no-burnout.component.css']
})
export class NoBurnoutComponent implements OnInit {

  activePosition: number = 0;
  affiliates: {name: String,src: String}[] = [
    {name: 'ysnrtnk', src: 'assets/affiliates/ysnrtnk.jpg'},
    {name: 'cajucart', src: 'assets/affiliates/cajucart.jpg'},
    {name: 'suequi3_art', src: 'assets/affiliates/suequi3_art.jpg'},
    {name: 'magicaljeffroland', src: 'assets/affiliates/magicaljeffroland.jpg'},
    {name: 'vie_pub_like', src: 'assets/affiliates/vie_pub_like.jpg'}
  ];
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;
  timeout: NodeJS.Timeout;

  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event']) //Vertical scroll
  onScroll(event) {
    this.changeImage(this.activePosition);
  }

  changeImage(position: number) { //Horizontal scroll
    if (!this.scrollContainer) return;
    const top = this.scrollContainer.nativeElement.getBoundingClientRect().top;
    const height = this.scrollContainer.nativeElement.offsetHeight;
    const windowHeight = this.windowService.height;
    if (top <=  windowHeight * 0.9 && top >= -height*0.9) {
      this.activePosition = position;
      const width = this.scrollContainer.nativeElement.offsetWidth;
      this.scrollContainer.nativeElement.scrollTo({
        top: 0,
        left: width * position,
        behavior: 'smooth'
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.changeImage(++this.activePosition % this.affiliates.length), 5000);
    } else {
      clearTimeout(this.timeout);
    }
  }
}
