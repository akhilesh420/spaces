import { Observable } from 'rxjs';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up-banner',
  templateUrl: './sign-up-banner.component.html',
  styleUrls: ['./sign-up-banner.component.css']
})
export class SignUpBannerComponent implements OnInit {

  earlyCount = new Observable((observer) => observer.next(0));

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.earlyCount = this.databaseService.getEarlyAccessCount();
  }

}
