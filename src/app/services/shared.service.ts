import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private modal = new BehaviorSubject<Boolean>(false);
  startIntro: Boolean = true;

  constructor() { }

  setModal(value: Boolean) {
    this.modal.next(value);
  }

  getModal() {
    return this.modal;
  }


}
