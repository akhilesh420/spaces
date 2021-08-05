import { Directive, ElementRef, OnInit, Input, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appAOS]'
})
export class AOSDirective implements OnInit {


  @Input() public className: string;
  @Input() public threshold_aos: number = 0.7;

  constructor (
      private renderer: Renderer2,
      private hostElement: ElementRef
  ) { }

  public ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  private onScroll(event: any) {
    const elementPosition = this.hostElement.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const trigger = elementPosition <= windowHeight*this.threshold_aos;
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
