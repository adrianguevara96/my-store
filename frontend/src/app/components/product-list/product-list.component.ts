import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  myShoppingCart: Product[] = [];
  total:number = 0;

  products: Product[] = [];

  today = new Date();
  date = new Date(2018, 1, 21);

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  async ngOnInit() {
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        console.log("data: ", data);
        this.products = data;
      },
      error: (err) => {
        console.log("err: ", err)
      },
      complete: () => {
        console.info("complete")
      }
    })
  }

  onAddToShoppingCart(product:Product) {
    // console.log(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
