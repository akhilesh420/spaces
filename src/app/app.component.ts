import { MixpanelService } from './services/mixpanel.service';
import { WindowService } from './services/window.service';
import * as AOS from 'aos';
import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy, Inject, Renderer2, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';


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
              private windowService: WindowService,
              private mixpanelService: MixpanelService) {}

  ngOnInit() {
    this.initialization();
  }

  initialization() {
    this.mixpanelService.init(); //Initialize tracking
    this.authService.anonSignIn();
    AOS.init();
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
