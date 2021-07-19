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
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.authLogin(provider);
    }

    // Auth logic to run auth providers
    async authLogin(provider: firebase.auth.AuthProvider, type: string = 'google signup') {
      try {
        const result = await (await this.auth.currentUser).linkWithPopup(provider);
        return new User(result.additionalUserInfo.profile['name'], result.user.email, type);
      } catch (error) {
        console.log(error);
        if (error.code === 'auth/credential-already-in-use') throw "This email has already been used!";
        throw "Something went wrong! Please try again."
      }
    }


}
