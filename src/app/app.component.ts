import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spaces';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    AOS.init();
    this.authService.anonSignIn();
  }
}
