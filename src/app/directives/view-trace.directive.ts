import { MixpanelService } from 'src/app/services/mixpanel.service';
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, AfterViewInit, Output, EventEmitter, OnInit, OnDestroy, Input, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';

@Directive({
  selector: '[appViewTrace]'
})
export class ViewTraceDirective implements OnInit, AfterViewInit, OnDestroy {

  @Input() public name: string;
  @Input() public fallbackEnabled: boolean = true;
  @Input() public removeListenersAfterLoad: boolean = false;
  @Output() public viewChanged: EventEmitter<any> = new EventEmitter();

  private _intersectionObserver?: IntersectionObserver;
  private _scrollSubscription?: Subscription;

  private _skipFirstTrace: boolean = null;
  private isTiming: boolean = false;

  constructor (
      private _element: ElementRef,
      private _zone: NgZone,
      @Inject(PLATFORM_ID) private platformId: Object,
      private mixpanelService: MixpanelService,
      private router: Router
  ) { }

  public ngOnInit() {
    this.router.events
      .pipe(filter((event: NavigationEvent) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isTiming) this.load(false);
      });
  }

  public ngAfterViewInit () {
      if (isPlatformBrowser(this.platformId)) {
          if (this.hasCompatibleBrowser()) {
              this.registerIntersectionObserver();
              if (this._intersectionObserver && this._element.nativeElement) {
                  this._intersectionObserver.observe(<Element>(this._element.nativeElement));
              }
          } else if (this.fallbackEnabled === true) {
              this.addScrollListeners();
          }
      }
  }

  public hasCompatibleBrowser (): boolean {
      const hasIntersectionObserver = 'IntersectionObserver' in window;
      const userAgent = window.navigator.userAgent;
      const matches = userAgent.match(/Edge\/(\d*)\./i);

      const isEdge = !!matches && matches.length > 1;
      const isEdgeVersion16OrBetter = isEdge && (!!matches && parseInt(matches[1], 10) > 15);

      return hasIntersectionObserver && (!isEdge || isEdgeVersion16OrBetter);
  }

  public ngOnDestroy () {
      this.removeListeners();
  }

  private registerIntersectionObserver (): void {
      if (!!this._intersectionObserver) {
          return;
      }
      this._intersectionObserver = new IntersectionObserver(entries => {
          this.checkForIntersection(entries);
      }, {threshold: 0.2});
  }

  private checkForIntersection = (entries: Array<IntersectionObserverEntry>) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
          if (this.checkIfIntersecting(entry)) {
              this.load(true);
          } else {
              this.load(false);
          }
      });
  }

  private checkIfIntersecting (entry: IntersectionObserverEntry) {
      // For Samsung native browser, IO has been partially implemented where by the
      // callback fires, but entry object is empty. We will check manually.
      if (entry && entry.time) {
          return (<any>entry).isIntersecting && entry.target === this._element.nativeElement;
      }
      return this.isVisible();
  }

  private load (visible: boolean): void {
      if (this.removeListenersAfterLoad) {
          this.removeListeners();
      }
      this.viewChanged.emit(visible);

      if (this._skipFirstTrace === null) this._skipFirstTrace = !visible; //Skip first trace
      if (this._skipFirstTrace) {
         this._skipFirstTrace = false;
         return;
      }

      if (visible) {
        this.mixpanelService.inViewTime(this.name);
        this.isTiming = true;
      } else {
        this.mixpanelService.inView(this.name, {name: this.name});
        this.isTiming = false;
      }
  }

  private addScrollListeners () {
      if (this.isVisible()) {
          this.load(true);
          return;
      }
      this._zone.runOutsideAngular(() => {
          this._scrollSubscription = fromEvent(window, 'scroll')
              .pipe(debounceTime(50))
              .subscribe(this.onScroll);
      });
  }

  private removeListeners () {
      if (this._scrollSubscription) {
          this._scrollSubscription.unsubscribe();
      }

      if (this._intersectionObserver) {
          this._intersectionObserver.disconnect();
      }
  }

  private onScroll = () => {
      if (this.isVisible()) {
          this._zone.run(() => this.load(true));
      }
  }

  private isVisible () {
      let scrollPosition = this.getScrollPosition();
      let elementOffset = this._element.nativeElement.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
      let elementHeight = this._element.nativeElement.offsetHeight;
      return (elementOffset <= scrollPosition && elementOffset + elementHeight >= scrollPosition);
  }

  private getScrollPosition () {
      // Getting screen size and scroll position for IE
      return (window.scrollY || window.pageYOffset)
          + (document.documentElement.clientHeight || document.body.clientHeight);
  }
}
