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

  products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      image: './assets/images/no-image.jpg',
      price: 100
    },
    {
      id: '2',
      name: 'Product 2',
      image: './assets/images/no-image.jpg',
      price: 350
    },
    {
      id: '3',
      name: 'Product 3',
      image: './assets/images/no-image.jpg',
      price: 500
    },
    {
      id: '4',
      name: 'Product 4',
      image: './assets/images/no-image.jpg',
      price: 1000
    },
    {
      id: '5',
      name: 'Product 5',
      image: './assets/images/no-image.jpg',
      price: 180
    }
  ]

  showImg: boolean = true;

  onLoaded(img: string) {
    console.log("log padre: ", img);
  }

  toogleImg() {
    this.showImg = !this.showImg;
  }
}