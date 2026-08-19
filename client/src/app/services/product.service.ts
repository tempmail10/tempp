import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string;
  pid: number;
  pname: string;
  price: number;
  brand: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:7000';

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getallproducts`);
  }

  addProduct(product: Product): Observable<{ message: string; product: Product }> {
    return this.http.post<{ message: string; product: Product }>(`${this.baseUrl}/addproduct`, product);
  }
}
