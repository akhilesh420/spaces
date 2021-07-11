import { SharedService } from './../services/shared.service';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, AfterViewInit, OnDestroy {

 

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    
  }

}
