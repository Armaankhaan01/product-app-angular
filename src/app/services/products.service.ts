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
    return this.apiService.get('https://angular-cc-1-server.vercel.app/' + url, {
      params,
      responseType: 'json',
    });
  };

  addProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.post('https://angular-cc-1-server.vercel.app/' + url, body, {
      responseType: 'json',
    });
  };

  editProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.put('https://angular-cc-1-server.vercel.app/' + url, body, {
      responseType: 'json',
    });
  };

  deleteProduct = (url: string): Observable<Product> => {
    return this.apiService.delete('https://angular-cc-1-server.vercel.app/' + url, {
      responseType: 'json',
    });
  };
  
}
