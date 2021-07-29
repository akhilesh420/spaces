import { SharedService } from './../services/shared.service';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit, OnDestroy {

  template: string;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.template = this.sharedService.getTemplate();
  }

  ngOnDestroy() {}

}
