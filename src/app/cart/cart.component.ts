import { Component } from '@angular/core';
import {CartEntryComponent} from "../cart-entry/cart-entry.component";
import {Observable} from "rxjs";
import {CartEntry} from "../shared/model/cart";
import {CartService} from "../shared/services/cart.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CartEntryComponent,
    AsyncPipe,
    NgIf,
    NgForOf,
    HeaderComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartEntries$!: Observable<CartEntry[]>;

  constructor(
    private cartService: CartService
  ) {
    this.cartEntries$ = cartService.getCart();
  }

  refreshCart() {
    setTimeout(() => {
      this.cartEntries$ = this.cartService.getCart();
    }, 500);
  }
}
