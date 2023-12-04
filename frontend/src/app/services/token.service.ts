import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  //localStorage, como hacerlo con una cookie?

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
}
