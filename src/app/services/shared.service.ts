import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private modal = new BehaviorSubject<Boolean>(false);
  startIntro: Boolean = environment.startIntro;

  constructor() { }

  setModal(value: Boolean) {
    this.modal.next(value);
  }

  getModal() {
    return this.modal;
  }

}
