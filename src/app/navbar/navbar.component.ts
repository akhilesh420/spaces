import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  scrollPosition: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onScroll(event) {
    this.scrollPosition =  window.scrollY
  }

}
