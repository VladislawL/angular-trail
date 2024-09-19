import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilterParams, Product} from "../model/product";
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

  getProducts(filterParams: FilterParams | undefined): Observable<Product[]> {
    let baseParams = new HttpParams();
    if (filterParams != null) {
      if (filterParams.query !== undefined && filterParams.query !== null && filterParams.query !== '') {
        baseParams = baseParams.set('name', filterParams.query);
      }
      if (filterParams.minPrice !== undefined && filterParams.minPrice !== null && filterParams.minPrice.toString() !== '') {
        baseParams = baseParams.set('price_gte', filterParams.minPrice);
      }
      if (filterParams.maxPrice !== undefined && filterParams.maxPrice !== null && filterParams.maxPrice.toString() !== '') {
        baseParams = baseParams.set('price_lte', filterParams.maxPrice);
      }
      if (filterParams.stock !== undefined && filterParams.stock !== null && filterParams.stock.toString() !== '') {
        if (filterParams.stock) {
          baseParams = baseParams.set('stock_gt', '0');
        } else {
          baseParams = baseParams.set('stock', '0');
        }
      }
      if (filterParams.rating !== undefined && filterParams.rating !== null && filterParams.rating.toString() !== '') {
        baseParams = baseParams.set('rating.rate_gte', filterParams.rating.toString());
      }
      if (filterParams.reviews !== undefined && filterParams.reviews !== null && filterParams.reviews.toString() !== '') {
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
}
