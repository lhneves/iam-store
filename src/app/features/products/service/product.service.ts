import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(code?: string, category?: string): Observable<IProduct[]> {
    let params = new HttpParams();
    if (code) {
      params = params.set('code', code);
    }
    if (category && category !== 'todos') {
      params = params.set('category', category);
    }
    return this.http.get<IProduct[]>(this.apiUrl, { params });
  }
}
