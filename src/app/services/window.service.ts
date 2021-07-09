import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  width: number = 0;
  height: number = 0;

  constructor() { }

  setDimensions(height: number, width: number) {
    console.log({width, height})
    this.height = height;
    this.width = width;
  }
}
