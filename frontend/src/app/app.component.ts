import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private fileService: FilesService,
  ) {}
  // imgParent = 'https://www.w3schools.com/howto/img_avatar.png';

  imgParent = '';

  showImg = true;

  // token
  token = '';

  // img
  img = '';

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

  downloadPDF() {
    this.fileService.getFile('my.pdf', '/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;

    const file = element.files?.item(0);

    if (file) {
      this.fileService.uploadFile(file)
      .subscribe( (data) => {
        this.img = data.location;
      })
    }

  }
}
