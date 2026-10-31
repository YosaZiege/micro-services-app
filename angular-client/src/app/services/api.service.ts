import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Bill,
  Customer,
  CustomersResponse,
  Product,
  ProductsResponse
} from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<CustomersResponse>('/customer-service/api/customers')
      .pipe(map((res) => res._embedded.customers));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductsResponse>('/inventory-service/api/products')
      .pipe(map((res) => res._embedded.products));
  }

  getBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(`/billing-service/bills/${id}`);
  }
}
