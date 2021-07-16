import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  count = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.count = (this.count + 1) % 3
    }, 3000);
  }

}
