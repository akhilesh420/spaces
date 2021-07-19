import { AuthService } from './../services/auth.service';
import { MixpanelService } from './../services/mixpanel.service';
import { Router } from '@angular/router';
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
  creating: Boolean = false;
  errors: { name: string  | undefined;
            email: string  | undefined;} = {name: undefined, email: undefined};

  constructor(private databaseService: DatabaseService,
              private mixpanelService: MixpanelService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  manualUser() {
    if (this.creating) return;
    this.validName();
    this.validEmail();
    if (this.errors.name || this.errors.email) return;
    this.creating = true;
    const user: User = new User(this.name, this.email, 'manual');
    this.saveUser(user);
  }

  googleSignUp() {
    if (this.creating) return;
    this.authService.googleAuth()
    .then((user) => {
      this.creating = true;
      this.saveUser(user);
    })
    .catch((e) => {
      if (e === "This email has already been used!") setTimeout(() => alert(e), 1);
      console.log(e);
    })
    .finally(() => this.mixpanelService.clickGoogleSignUp());
  }

  async saveUser(user: User) {
    await this.databaseService.setUser(user)
      .then((timestamp) => {
        this.mixpanelService.earlyAccess({...user, timestamp});
        this.router.navigate(['message']);
      })
      .catch((e) => alert(e));
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

  ngOnDestroy() {

  }

}
