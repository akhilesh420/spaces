import { User } from './../models/user.model';
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
              private mixpanelService: MixpanelService) {
                auth.onAuthStateChanged((user) => {
                  console.log(user.uid);
                })
              }

  async anonSignIn() {
    await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await this.auth.signInAnonymously()
      .then((user) => {
        this.mixpanelService.signIn(user.user.uid, user.additionalUserInfo.isNewUser);
      })
      .catch((e) => console.log(e));
  }

    // Sign in with Google
    googleAuth() {
      return this.authLogin(new firebase.auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    async authLogin(provider: firebase.auth.AuthProvider) {
      try {
        const result = await (await this.auth.currentUser).linkWithPopup(provider);
        const user = result.user;
        return new User(user.displayName, user.email);
      } catch (error) {
        console.log(error);
        if (error.code === 'auth/credential-already-in-use') throw "This email has already been used!";
        throw "Something went wrong! Please try again."
      }
    }


}
