import { SharedService } from './../../../services/shared.service';
import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, AfterViewInit, OnDestroy {

  count = 0;
  notifier$ = new Subject();

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.sharedService.getModal()
    .pipe(takeUntil(this.notifier$))
    .subscribe(state => {
      if (!state) {
        setInterval(() => {
          this.count = (this.count + 1) % 3
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    this.notifier$.next();
    this.notifier$.complete();
  }

}
