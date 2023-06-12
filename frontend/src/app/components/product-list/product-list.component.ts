import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  myShoppingCart: Product[] = [];
  total:number = 0;

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
  ];

  onAddToShoppingCart(product:Product) {
    // console.log(product);
    this.myShoppingCart.push(product);
    this.total = this.myShoppingCart.reduce( (sum, product) => sum + product.price, 0);
  }
}
