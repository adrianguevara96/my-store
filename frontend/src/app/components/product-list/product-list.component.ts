import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
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
    this.productsService.getAll().subscribe({
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
    const swiperEl = document.querySelector('swiper-container');
    swiperEl?.swiper.slideTo(0);

    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    // this.productsService.getOneProduct(id).subscribe( data => {
    //   console.log(data);
    // });
    this.product = this.products.find( product => {
      return product.id === id;
    });
    this.toggleProductDetail();
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'New product',
      description: 'new description',
      categoryId: '1',
      images: ['https://picsum.photos/200/300?random=1'],
      price: 5000
    }
    this.productsService.create(product).subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      ...this.product,
      title: 'new title edited',
    }
    const id = this.product?.id;
    if(id){
      this.productsService.updatePUT(id, changes).subscribe(data => {
        const indexProduct = this.products.findIndex(item => item.id === id);
        this.products[indexProduct] = data;
        this.product = data;
      });
    }else{
      return;
    }
  }

  deleteProduct() {
    const id = this.product?.id;
    if(id) {
      this.productsService.delete(id).subscribe(data => {
        console.log(data);
        if(data){
          const indexProduct = this.products.findIndex(item => item.id === id);
          this.products.splice(indexProduct, 1);
          this.showProductDetail = false;
        }
      })
    }
  }
}
