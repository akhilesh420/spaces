import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireCounterService {

  num_shards = 10;

  constructor(private afs: AngularFirestore) { }

  createCounter(ref: DocumentReference, num_shards: number = this.num_shards) {
    var batch = this.afs.firestore.batch();

    // Initialize the counter document
    batch.set(ref, { num_shards: num_shards });

    // Initialize each shard with count=0
    for (let i = 0; i < num_shards; i++) {
        const shardRef = ref.collection('shards').doc(i.toString());
        batch.set(shardRef, { count: 0 });
    }

    // Commit the write batch
    return batch.commit();
  }

  incrementCounter(ref: DocumentReference, num_shards: number = this.num_shards) {
    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection('shards').doc(shard_id);

    // Update count
    return shard_ref.update("count", firebase.firestore.FieldValue.increment(1));
  }

  batchIncrementCounter(ref: DocumentReference,
                        batch: firebase.firestore.WriteBatch,
                        num_shards: number = this.num_shards) {
    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection('shards').doc(shard_id);

    // Update count
    batch.update(shard_ref, {"count": firebase.firestore.FieldValue.increment(1)});
  }

  getCount(ref: AngularFirestoreDocument) {
    // Sum the count of each shard in the subcollection
    return ref.collection('shards').valueChanges()
      .pipe(map(shards => {
        let total_count = 0;
        shards.forEach((shard) => {
            total_count += shard.count;
        });

        return total_count;
      }));
  }
}