import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, AfterViewInit {

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
