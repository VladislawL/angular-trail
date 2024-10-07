import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilterParams, Product} from "../models/product";
import {Review} from "../models/review";
import {Observable} from "rxjs";
import {ParamsMapping} from "../../shared/models/params-mapping";
import {isNotEmpty} from "../../shared/utils/utils";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) {}

  getProducts(filterParams: FilterParams | undefined): Observable<Product[]> {
    let baseParams = new HttpParams();

    const paramMappings: ParamsMapping = {
      query: { route: 'query', queryParam: 'title' },
      minPrice: { route: 'minPrice', queryParam: 'price_gte' },
      maxPrice: { route: 'maxPrice', queryParam: 'price_lte' },
      stock: { route: 'inStock', queryParam: (value: boolean) => (value ? 'stock_gt=0' : 'stock=0') },
      rating: { route: 'rating', queryParam: 'rating.rate_gte' },
      reviews: { route: 'hasReviews', queryParam: (value: boolean) => (value ? 'rating.count_gt=0' : 'rating.count=0') }
    };

    if (filterParams) {
      Object.keys(paramMappings).forEach((key) => {
        const filterValue = (filterParams as any)[key];
        if (isNotEmpty(filterValue)) {
          const mapping = paramMappings[key];
          const queryParam = mapping.queryParam;

          if (typeof queryParam === 'function') {
            const [keyName, keyValue] = queryParam(filterValue).split('=');
            baseParams = baseParams.set(keyName, keyValue);
          } else {
            baseParams = baseParams.set(queryParam, filterValue);
          }
        }
      });
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
}
