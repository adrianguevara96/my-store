import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  showMenu: boolean = false;

  counterCart = 0;

  constructor(
    private storeService: StoreService) {

    }

  ngOnInit() {
    this.storeService.myCart$.subscribe( products => {
      this.counterCart = products.length;
    })
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

}
