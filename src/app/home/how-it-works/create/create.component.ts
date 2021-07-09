import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {

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
