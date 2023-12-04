import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products'

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?:number, offset?:number) {
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
    .pipe(
      retry(3)
    );
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(catchError(( err: HttpErrorResponse) => {
        return this.handleErrors(err);
      }));
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  updatePATCH(id: string, data: UpdateProductDTO) {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, data);
  }

  updatePUT(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  handleErrors(error: HttpErrorResponse): Observable<never>  {
    if (error.status == HttpStatusCode.Forbidden)
      return throwError(() => new Error ('No tiene permisos para realizar la solicitud.'));
    if (error.status == HttpStatusCode.NotFound)
      return throwError(() => new Error ('El producto no existe.'));
    if (error.status == HttpStatusCode.InternalServerError)
      return throwError(() => new Error ('Error en el servidor.'));
    return throwError(() => new Error ('Un error inesperado ha ocurrido.'));
  }
}
