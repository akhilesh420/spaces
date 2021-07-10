import { MixpanelService } from './mixpanel.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private mixpanelService: MixpanelService) { }

  async anonSignIn() {
    await this.auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    await this.auth.signInAnonymously()
      .then((user) => {
        this.mixpanelService.signIn(user.user.uid, user.additionalUserInfo.isNewUser);
      })
      .catch((e) => console.log(e));
  }

}
