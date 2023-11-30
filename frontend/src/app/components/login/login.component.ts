import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private userServices: UsersService,
    private authServices: AuthService
  ) {}

  createUser() {
    this.userServices.create({
      name: 'Test',
      email: 'test@test.com',
      password: '12345',
      avatar: 'http://img.com'
    })
    .subscribe(response => {
      console.log('create user: ',response);
    })
  }

  login() {
    this.authServices.login('test@test.com', '12345')
    .subscribe(response => {
      console.log('login: ', response);
    })
  }
}
