import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  async anonSignIn() {
    await this.auth.setPersistence('local');
    await this.auth.signInAnonymously()
      .then((user) => console.log('signed in!'))
      .catch((e) => console.log(e));
  }

}
