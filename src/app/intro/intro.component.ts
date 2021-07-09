import { SharedService } from './../services/shared.service';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, AfterViewInit, OnDestroy {

  times = [6400, 6400, 9200, 1200];
  $count: BehaviorSubject<number> = new BehaviorSubject(0);
  $notifier = new Subject();

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.setModal(true);
  }

  ngAfterViewInit() {
    this.sharedService.startIntro = false;
    this.$count.pipe(takeUntil(this.$notifier)).subscribe((count) => {
      console.log(count);
      if (count >= 4) {
        this.sharedService.setModal(false);
        this.$count.complete();
        this.$notifier.next();
        this.$notifier.complete();
      }
      setTimeout(() => {
        this.$count.next(count + 1);
      }, this.times[count]);
    });
  }

  ngOnDestroy() {
    this.$count.complete();
    this.$notifier.next();
    this.$notifier.complete();
  }

}
