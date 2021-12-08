import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-carousel-buttons',
  templateUrl: './carousel-buttons.component.html',
  styleUrls: ['./carousel-buttons.component.css']
})
export class CarouselButtonsComponent implements OnInit {

  @Input() count: number;
  buttonCount: number[];
  @Input() activeButton = 0;
  @Output() activeButtonChange = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
    this.activeButtonChange.emit(this.activeButton);
    this.buttonCount = new Array(this.count);
  }

  buttonClick(buttonNumber) {
    this.activeButton = buttonNumber;
    this.activeButtonChange.emit(buttonNumber);
  }

}
