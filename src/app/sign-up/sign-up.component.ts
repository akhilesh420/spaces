import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { MixpanelService } from '../services/mixpanel.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  name = '';
  email = '';
  creating: boolean = false;
  earlyCount: BehaviorSubject<number>;
  error: string  | undefined =  undefined;
  // errors: { name: string  | undefined;
  //   email: string  | undefined;} = {name: undefined, email: undefined};
  signUpState: boolean = false;
  $notifier: Subject<null> = new Subject();

  constructor(private databaseService: DatabaseService,
              private mixpanelService: MixpanelService,
              private authService: AuthService,
              private sharedService: SharedService,
              private router: Router) { }

  ngOnInit(): void {
    this.earlyCount = this.sharedService.getUserCount();
    this.databaseService.userSignedUp
      .pipe(takeUntil(this.$notifier)).subscribe((value) => this.signUpState = value)
  }

  manualUser() {
    if (this.creating) return;
    this.validName();
    this.validEmail();
    if (this.error) return;
    this.creating = true;
    const user: User = new User(this.name, this.email, 'manual');
    this.saveUser(user)
      .catch((e) => {
        console.log(e);
      });
  }

  googleSignUp() {
    if (this.creating) return;
    this.authService.googleAuth()
    .then((user) => {
      this.creating = true;
      this.saveUser(user);
    })
    .catch((e) => {
      if (e === "This email has already been used!") setTimeout(() => this.error = e, 1);
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
      .catch((e) => {
        if (e === "This email has already been used!") this.error = e;
        console.log(e);
      });
    this.creating = false
  }

  validName() {
    if (!this.name || this.name.length === 0) return this.error = 'Name is required';
    return this.error = undefined;
  }

  validEmail() {
    if (!this.email || this.email.length === 0) return this.error = 'Email is required';
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(this.email).toLowerCase())) return this.error = 'Invalid email';
    return this.error = undefined;
  }

  ngOnDestroy() {
    this.$notifier.next();
    this.$notifier.complete();
  }
}
