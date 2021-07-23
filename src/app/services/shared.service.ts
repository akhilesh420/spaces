import { MixpanelService } from './mixpanel.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { templates } from '../extras/templates';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private startValue: number = environment.startUsers;
  private userCount: BehaviorSubject<number> = new BehaviorSubject(this.startValue);

  constructor(private databaseService: DatabaseService,
              private mixpanelService: MixpanelService,
              private router: Router) {
    router.events
      .pipe(filter((event: NavigationEvent) => event instanceof NavigationEnd), pairwise())
      .subscribe((event: [NavigationEnd, NavigationEnd]) => {
        const fromParentRoute = event[0].urlAfterRedirects.split('/')[1];
        const toParentRoute = event[1].urlAfterRedirects.split('/')[1];

        this.mixpanelService.routeChange({from: fromParentRoute, to: toParentRoute});
      });
  }

  setUserCount() {
    const totalTime = 1000;
    let currentCount = this.startValue;
    this.databaseService.getEarlyAccessCount().subscribe(count => {
      const interval = setInterval(() => {
        if (currentCount >= count) return clearInterval(interval);
        this.userCount.next(++currentCount);
      }, totalTime/(count-this.startValue));
    });
  }

  getUserCount() {
    return this.userCount;
  }

  setTemplate() {
    if (localStorage.getItem('template'))  return;
    const length = templates.length;
    const template = templates[this.getRandomInt(length)];
    localStorage.setItem('template', template);
  }

  getTemplate() {
    const template =  localStorage.getItem('template');
    if (!template) return this.setTemplate();
    return template;
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

}
