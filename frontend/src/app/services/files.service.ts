import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { tap, map } from 'rxjs';

interface File {
  originalname: string,
  filename: string,
  location: string
}
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/files/upload'

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' })
    .pipe(
      tap( (content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map( () => true) // con el map transformamos la peticion para retornar un true.
    )
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<File>(this.apiUrl, dto, {
      // headers: {
      //   'Content-type': 'multipart/form-data'
      // }
    })
  }
}
