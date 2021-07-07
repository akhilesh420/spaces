import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {

  count = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.count = (this.count + 1) % 3
    }, 3000);
  }

}
