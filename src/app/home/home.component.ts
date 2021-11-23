import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  landingOption: AnimationOptions = {path: 'assets/Landing animation/Landing Animation.json'};
  @ViewChild('animation') animation: ElementRef<HTMLVideoElement>;

  videoLoop: NodeJS.Timeout;

  value;

  constructor() { }

  ngOnInit(): void {
  }

  onContentChange(event) {
    return console.log('ok: ', event);
    if (event.target.files)  {
      var reader = new FileReader();

      let file: File = event.target.files[0];
      let newFile: File;

      if (!file) return;

      reader.readAsDataURL(file);
      reader.onload = (event:any) => {

        if (file.type === 'video/quicktime') {
        // create new file with type as mp4
          const dataurl = event.target.result;
          let arr = dataurl.split(','),
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);

          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          newFile  = new File([u8arr], "test.mp4", {type:'video/mp4', lastModified: new Date().getDate()});
          reader.readAsDataURL(newFile);
          reader.onload = (event:any) => {
            this.value = event.target.result;
          }
        }
      }
    }
  }
}
