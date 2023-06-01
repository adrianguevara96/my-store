import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  img: string = '';
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    //code
    console.log("img changed");
  }

  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = './assets/images/no-image.jpg';
  counter = 0;
  counterFn: number | undefined;

  ngOnChanges( changes: SimpleChanges) {
    console.log("changes: ", changes)
  }

  ngOnInit() {
    this.counterFn = window.setInterval( () => {
      this.counter += 1;
      console.log('run counter');
    }, 1000);
  }

  ngOnDestroy() {
    window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log("log hijo");
    this.loaded.emit(this.img);
  }

}
