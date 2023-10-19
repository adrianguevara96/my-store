import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{

  myShoppingCart: Product[] = [];
  total = 0;

  products: Product[] = [];
  product?: Product;

  showProductDetail = false;

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

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    // this.productsService.getOneProduct(id).subscribe( data => {
    //   console.log(data);
    // });
    this.product = this.products.find( product => {
      return product.id === id;
    });
    console.log('product selected: ', this.product);
  }
}
