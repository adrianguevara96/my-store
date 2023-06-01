import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // imgParent = 'https://www.w3schools.com/howto/img_avatar.png';

  imgParent = '';

  showImg: boolean = true;

  onLoaded(img: string) {
    console.log("log padre: ", img);
  }

  toogleImg() {
    this.showImg = !this.showImg;
  }
}