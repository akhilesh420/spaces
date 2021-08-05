import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, Input, NgZone, Inject, PLATFORM_ID, Renderer2, HostListener } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { NavigationEnd, Event as NavigationEvent } from '@angular/router';
@Directive({
  selector: '[appAOS]'
})
export class AOSDirective implements OnInit {


  @Input() public className: string;
  @Input() public threshold_aos: number = 0.4;

  constructor (
      private renderer: Renderer2,
      private hostElement: ElementRef
  ) { }

  public ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll(event: any) {
    const scroll = window.pageYOffset;
    const elementPosition = this.hostElement.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const trigger = elementPosition + windowHeight*this.threshold_aos <= scroll;
    trigger ? this.inView(): this.notInView();
  }

  private inView() {
    this.renderer.addClass(this.hostElement.nativeElement, this.className);
    this.renderer.removeClass(this.hostElement.nativeElement, this.className + '-reverse');
  }

  private notInView() {
    this.renderer.addClass(this.hostElement.nativeElement, this.className + '-reverse');
    this.renderer.removeClass(this.hostElement.nativeElement, this.className);
  }

}
