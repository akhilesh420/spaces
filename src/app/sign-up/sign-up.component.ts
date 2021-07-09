import { DatabaseService } from './../services/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';

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
  errors: { name: string  | undefined;
            email: string  | undefined;
            link: string  | undefined; } = {name: undefined, email: undefined, link: undefined};

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  async saveUser() {
    if (this.creating) return;
    this.validName();
    this.validEmail();
    this.validLink();
    if (this.errors.name || this.errors.email || this.errors.link) return;
    this.creating = true;
    const user: User = new User(this.name, this.email, this.link);
    await this.databaseService.setUser(user);
    this.creating = false
  }

  validName() {
    if (!this.name || this.name.length === 0) return this.errors.name = 'Name is required';
    return this.errors.name = undefined;
  }

  validEmail() {
    if (!this.email || this.email.length === 0) return this.errors.email = 'Email is required';
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(this.email).toLowerCase())) return this.errors.email = 'Invalid email';
    return this.errors.email = undefined;
  }

  validLink() {
    if (!this.link || this.link.length === 0) return this.errors.link = 'Social link is required';
    if (this.link.indexOf(' ') >= 0) return this.errors.link = 'Invalid social link';
    const linkify = require('linkifyjs');
    const links =  linkify.find(this.link);
    if (links.length <= 0) return this.errors.link = 'Invalid social link';
    return this.errors.link = undefined;
  }

  ngOnDestroy() {

  }

}
