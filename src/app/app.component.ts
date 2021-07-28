import { SharedService } from './services/shared.service';
import { MixpanelService } from './services/mixpanel.service';
import { WindowService } from './services/window.service';
import * as AOS from 'aos';
import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy, Inject, Renderer2, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { take} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


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
              private sharedService: SharedService,
              private mixpanelService: MixpanelService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.sharedService.setUserCount();
    this.trackIncoming();
    this.initialization();
  }

  initialization() {
    this.sharedService.setTemplate();
    this.mixpanelService.init(); //Initialize tracking
    this.authService.anonSignIn();
    AOS.init();
  }

  trackIncoming() {
    this.route.queryParams.pipe(take(2)).subscribe(params => {
      const tid = params.tid;
      const eid = params.eid;
      const cid = params.cid;

      if (!!tid) this.mixpanelService.setUserProperty('tid', tid);      ;
      if (!!eid) this.mixpanelService.setUserProperty('eid', eid);
      if (!!cid) this.mixpanelService.setUserProperty('cid', cid);
      this.router.navigate(['.']);
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
