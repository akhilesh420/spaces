import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-animation-group',
  templateUrl: './animation-group.component.html',
  styleUrls: ['./animation-group.component.css']
})
export class AnimationGroupComponent implements OnInit {

  tiktok: AnimationOptions = {path: 'assets/Lottie animations/Tiktok/tiktok-3713691.json',};

  pinterest: AnimationOptions = {path: 'assets/Lottie animations/Pinterest/pinterest-3713687.json',};

  instagram: AnimationOptions = {path: 'assets/Lottie animations/Instagram/instagram-3713696.json', };

  twitter: AnimationOptions = {path: 'assets/Lottie animations/Twitter/twitter-3713693.json', };
 
  youtube: AnimationOptions = {path: 'assets/Lottie animations/Youtube/youtube-3713694.json', };

  behance: AnimationOptions = {path: 'assets/Lottie animations/Instagram/instagram-3713696.json',};

  constructor() { }

  ngOnInit(): void {
  }

}
