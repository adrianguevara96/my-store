import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  showMenu = false;

  counterCart = 0;

  // token
  token = '';
  // profile
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService) {

    }

  ngOnInit() {
    this.storeService.myCart$.subscribe( products => {
      this.counterCart = products.length;
    })
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  login() {
    this.authService.login('test1@test.com', '123456')
    .pipe(
      switchMap( (login) => {
        this.token = login.access_token;
        return this.authService.profile(login.access_token);
      } )
    )
    .subscribe({
      next: (user) => {
        console.log('token user response: ', user);
        this.profile = user;
      },
      error: (err) => {
        console.log('err: ', err)
      },
    })
  }

  getProfile() {
    this.authService.profile(this.token)
    .subscribe(user => {
      this.profile = user;
    })
  }

}
