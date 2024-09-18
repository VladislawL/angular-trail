import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilterParams, Product} from "../model/product";
import {Review} from "../model/review";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {
  }

  getProducts(filterParams: FilterParams | undefined): Observable<Product[]> {
    let baseParams = new HttpParams();
    if (filterParams != null) {
      if (this.isNotEmpty(filterParams.query)) {
        baseParams = baseParams.set('title', filterParams.query);
      }
      if (this.isNotEmpty(filterParams.minPrice)) {
        baseParams = baseParams.set('price_gte', filterParams.minPrice);
      }
      if (this.isNotEmpty(filterParams.maxPrice)) {
        baseParams = baseParams.set('price_lte', filterParams.maxPrice);
      }
      if (this.isNotEmpty(filterParams.stock)) {
        if (filterParams.stock) {
          baseParams = baseParams.set('stock_gt', '0');
        } else {
          baseParams = baseParams.set('stock', '0');
        }
      }
      if (this.isNotEmpty(filterParams.rating)) {
        baseParams = baseParams.set('rating.rate_gte', filterParams.rating);
      }
      if (this.isNotEmpty(filterParams.reviews)) {
        if (filterParams.reviews) {
          baseParams = baseParams.set('rating.count_gt', '0');
        } else {
          baseParams = baseParams.set('rating.count', '0');
        }
      }
    }
    return this.http.get<Product[]>("http://localhost:3000/products", { params: baseParams });
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

  updateProduct(id: string,product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/products/${id}`, product);
  }

  isNotEmpty(value: any): boolean {
    return !this.isEmpty(value);
  }

  isEmpty(value: any): boolean {
    return !value;
  }
}
