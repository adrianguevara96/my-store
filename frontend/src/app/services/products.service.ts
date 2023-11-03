import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products'

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
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
}
