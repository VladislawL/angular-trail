import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CartEntry} from "../models/cart";
import {Product} from "../../product/models/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) {}

  getCart(): Observable<CartEntry[]> {
    return this.http.get<CartEntry[]>("http://localhost:3000/cart");
  }

  getCartEntry(id: string): Observable<CartEntry | undefined> {
    return this.http.get<CartEntry[]>("http://localhost:3000/cart", {
      params: {'productId': id}
    }).pipe(
      map(entries => entries.length > 0 ? entries[0] : undefined)
    );
  }

  removeCartEntry(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/cart/${id}`);
  }

  createCartEntry(product: Product): Observable<CartEntry> {
    return this.http.post<CartEntry>(`http://localhost:3000/cart`, {
      count: 1,
      price: product.price,
      productId: product.id,
      title: product.title
    });
  }

  updateCartEntry(id: string, product: Product, quantity: number): Observable<any> {
    return this.http.put<CartEntry>(`http://localhost:3000/cart/${id}`, {
      count: quantity,
      price: product.price,
      productId: product.id,
      title: product.title
    });
  }
}
