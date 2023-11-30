import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  // imgParent = 'https://www.w3schools.com/howto/img_avatar.png';

  imgParent = '';

  showImg = true;

  // token
  token = '';

  onLoaded(img: string) {
    console.log("log padre: ", img);
  }

  toogleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create(
      {
        email: 'test1@test.com',
        name: 'test',
        password: '123456',
        avatar: 'https://www.example.com/'
      }
    )
    .subscribe(response => {
      console.log(response);
    })
  }
}
