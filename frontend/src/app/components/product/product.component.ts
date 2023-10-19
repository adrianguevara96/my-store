import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product;

  // send product added to product list component
  @Output() addedProduct = new EventEmitter<Product>();
  // send product id to product list component
  @Output() showProduct = new EventEmitter<string>();

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  showDetail() {
    this.showProduct.emit(this.product.id);
  }
}
