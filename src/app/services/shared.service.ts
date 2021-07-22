import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private startValue: number = environment.startUsers;
  private userCount: BehaviorSubject<number> = new BehaviorSubject(this.startValue);

  constructor(private databaseService: DatabaseService) {}

  setUserCount() {
    const totalTime = 1000;
    let currentCount = this.startValue;
    this.databaseService.getEarlyAccessCount().subscribe(count => {
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
