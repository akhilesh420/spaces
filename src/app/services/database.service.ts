import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
              private countService: FireCounterService,
              private router: Router) { }

  getEarlyAccessCount () {
    return this.countService.getCount(this.afs.collection('counter').doc('public'));
  }

  async setUser(userInfo: User) {
    const id = this.afs.createId();
    const user = (await this.auth.currentUser);
    const uid = user ? user.uid : this.afs.createId();
    const userDocRef = this.afs.firestore.collection('alphaUsers').doc(uid).collection('signUps').doc(id);
    const publicCountRef = this.afs.firestore.collection('counter').doc('public');
    const privateCountRef = this.afs.firestore.collection('counter').doc('private');
    const batch = this.afs.firestore.batch();

    batch.set(userDocRef, {...userInfo, timestamp: Date()});
    this.countService.batchIncrementCounter(publicCountRef, batch);
    this.countService.batchIncrementCounter(privateCountRef, batch);

    await batch.commit()
      .then(() => this.router.navigate(['message']))
      .catch(() => alert('Something went wrong! Please try again.'))
  }

}
