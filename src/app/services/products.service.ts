import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get('http://localhost:3000/' + url, {
      params,
      responseType: 'json',
    });
  };

  addProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.post('http://localhost:3000/' + url, body, {
      responseType: 'json',
    });
  };

  editProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.put('http://localhost:3000/' + url, body, {
      responseType: 'json',
    });
  };

  deleteProduct = (url: string): Observable<Product> => {
    return this.apiService.delete('http://localhost:3000/' + url, {
      responseType: 'json',
    });
  };
  
}
