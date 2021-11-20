import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  imageObject: Array<object> = [
    {
      image: 'assets/test/Baby Yoda Chickie Nuggies  Bubble-free stickers.jpg'
    },
    {
      image: 'assets/test/blur, beard, sailor, marine,.jpg'
    },
    {
      image: 'assets/test/Butterfly Vinyl Sticker _ Monarch Butterfly _ Stickers for Hydroflask _ Laptop Stickers _ Waterproof.jpg'
    }];

  constructor() { }

  ngOnInit(): void {
  }

}
