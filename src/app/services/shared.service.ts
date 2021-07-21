import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  startValue: number = 700;
  userCount: BehaviorSubject<number> = new BehaviorSubject(this.startValue);

  constructor(private databaseService: DatabaseService) {}

  setUserCount() {
    const totalTime = 1000;
    this.databaseService.getEarlyAccessCount().subscribe(count => {
      let currentCount = this.startValue;
      const interval = setInterval(() => {
        if (currentCount >= count) return clearInterval(interval);
        this.userCount.next(++currentCount);
      }, totalTime/(count-this.startValue));
    });
  }

  getUserCount() {
    return this.userCount;
  }

}
