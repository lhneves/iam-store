import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts({
    id,
    code,
    category,
  }: {
    id?: number;
    code?: string;
    category?: string;
  }): Observable<IProduct[]> {
    let params = new HttpParams();
    if (id) {
      params = params.set('id', id);
    }
    if (code) {
      params = params.set('code', code);
    }
    if (category && category !== 'todos') {
      params = params.set('category', category);
    }
    return this.http.get<IProduct[]>(`${this.apiUrl}`, { params });
  }

  deleteProductById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProductById(
    id: number,
    update: { productName?: string; category?: string }
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, update, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  createProduct(product: {
    code: number;
    productName: string;
    category: string;
  }): Observable<any> {
    return this.checkIfCodeExists(product.code).pipe(
      switchMap((exists) => {
        if (exists) {
          return of({ error: 'Código de produto já utilizado.' });
        } else {
          if (!product.code || !product.category || !product.productName) {
            return of({ error: 'Dados incompletos.' });
          }
          return this.http.post<IProduct>(this.apiUrl, product, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          });
        }
      })
    );
  }

  private checkIfCodeExists(code: number): Observable<boolean> {
    return this.http
      .get<IProduct[]>(`${this.apiUrl}?code=${code}`)
      .pipe(map((products) => products.length > 0));
  }
}
