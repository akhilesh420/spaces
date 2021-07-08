import { DatabaseService } from './../services/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';

enum Errors {
    name = '',
    email = '',
    link = ''
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  name = ''
  email = ''
  link = ''
  creating: Boolean = false;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  async saveUser() {
    if (this.creating) return;
    this.creating = true;
    const user: User = new User(this.name, this.email, this.link);
    await this.databaseService.setUser(user);
    this.creating = false
  }

  ngOnDestroy() {

  }

}
