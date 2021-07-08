import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, OnDestroy {

  times = [6400, 6400, 9200];
  $count: BehaviorSubject<number> = new BehaviorSubject(0);
  $notifier = new Subject();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.$count.pipe(takeUntil(this.$notifier)).subscribe((count) => {
      console.log(count);
      if (count >= 3) {
        this.router.navigate(["home"]);
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
