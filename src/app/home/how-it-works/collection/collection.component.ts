import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit, OnDestroy {

  count = 0;


  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.count = (this.count + 1) % 3
    }, 3000);
  }


  ngOnDestroy() {}

}
