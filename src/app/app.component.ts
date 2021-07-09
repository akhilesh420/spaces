import { WindowService } from './services/window.service';
import { SharedService } from './services/shared.service';
import * as AOS from 'aos';
import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy, Inject, Renderer2, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Postpress';
  notifier$ = new Subject();

  @ViewChild('master') master: ElementRef<HTMLElement>;

  constructor(private authService: AuthService,
              private sharedService: SharedService,
              private windowService: WindowService,
              @Inject(DOCUMENT) private _document: any,
              private renderer: Renderer2,
              private router: Router) {}

  ngOnInit() {
    AOS.init();
    this.authService.anonSignIn();

    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event  => {
        if (!event.urlAfterRedirects.startsWith('/home')) this.sharedService.startIntro = false;
      });

    this.sharedService.getModal()
    .pipe(takeUntil(this.notifier$))
    .subscribe(state => {
      if (!state) {
        this._document.body.style.top = null;
        this.renderer.removeClass(this._document.body, 'body-no-scroll');
        window.scroll(0, 0);
      } else {
        this._document.body.style.top = '0px';
        this.renderer.addClass(this._document.body, 'body-no-scroll');
      }
    });
  }

  ngAfterViewInit() {
    this.onResize();
  }

  onResize() {
    this.windowService.setDimensions(this.master.nativeElement.offsetHeight, this.master.nativeElement.offsetWidth);
  }


  ngOnDestroy() {
    this.notifier$.next();
    this.notifier$.complete();
  }
}
