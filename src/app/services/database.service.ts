import { AngularFireAuth } from '@angular/fire/auth';
import { FireCounterService } from './fire-counter.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore,
              private auth: AngularFireAuth,
              private countService: FireCounterService) { }

  getEarlyAccessCount () {
    return this.countService.getCount(this.afs.collection('counter').doc('public'));
  }

  async setUser(userInfo: User) {
    const id = this.afs.createId();
    const user = (await this.auth.currentUser);
    const uid = user ? user.uid : this.afs.createId();
    const emailRef = this.afs.firestore.collection('alphaUsers').doc(userInfo.email);
    const publicCountRef = this.afs.firestore.collection('counter').doc('public');
    const privateCountRef = this.afs.firestore.collection('counter').doc('private');

    const transaction =  this.afs.firestore.runTransaction(async (t) => {
      return t.get(emailRef).then((response) => {
        if (response.exists) throw 'email_used';

        const timestamp = new Date();
        t.set(emailRef, {...userInfo, timestamp:timestamp, uid: uid});
        this.countService.batchIncrementCounter(publicCountRef, t);
        this.countService.batchIncrementCounter(privateCountRef, t);

        return Promise.resolve(timestamp);
      });
    }).catch((e) =>{
      if (e === 'email_used') throw "This email has already been used!";
      throw "Something went wrong! Please try again.";
    });

    return transaction;
  }

  createCounters() {
    console.log('creating counters')
    const counterRef = this.afs.firestore.collection('counter');
    const privateRef = counterRef.doc('private');
    const publicRef = counterRef.doc('public');

    this.countService.createCounter(privateRef);
    this.countService.createCounter(publicRef);

  }

}
