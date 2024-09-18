import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {Review} from "../model/review";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3000/products");
  }

  getProduct(id: string | null): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  getReviewsByProductId(id: string): Observable<Review[]> {
    const baseParams = new HttpParams().set('productId', id);
    return this.http.get<Review[]>(`http://localhost:3000/reviews`, {
      params: baseParams
    });
  }

  isProductPurchasable(product: Product): boolean {
    return product.stock > 0;
  }
}
