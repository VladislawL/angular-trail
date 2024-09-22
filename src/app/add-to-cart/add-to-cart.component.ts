import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CartService} from "../shared/services/cart.service";
import {Product} from "../shared/model/product";
import {CartEntry} from "../shared/model/cart";

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent implements OnInit {

  @Input()
  disabled: boolean = false;

  @Input()
  product!: Product;

  quantity: number = 0;
  cartAdded: boolean = false;
  cartEntry: CartEntry | undefined;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.getCartEntry(this.product.id).subscribe({
      next: (value) => {
        if (!this.isEmpty(value) && value) {
          this.cartEntry = value;
          this.quantity = value.count;
          if (this.quantity > 0) {
            this.cartAdded = true;
          }
        }
      }
    });
  }

  updateQuantity(quantity: number, event: Event) {
    this.changeQuantity(quantity, event);
    if (this.cartEntry) {
      this.cartService.updateCartEntry(this.cartEntry.id, this.product, this.quantity).subscribe();
    }
  }

  addToCart(event: Event) {
    this.cartAdded = true;
    this.changeQuantity(1, event);
    this.cartService.createCartEntry(this.product).subscribe();
  }

  changeQuantity(quantity: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.quantity + quantity > 0 || this.quantity < 5) {
      this.quantity += quantity;
    }
  }

  removeFromCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.cartAdded = false;
    this.quantity = 0;
    if (this.cartEntry) {
      this.cartService.removeCartEntry(this.cartEntry.id).subscribe();
    }
  }

  isEmpty(value: any): boolean {
    return !value || (Array.isArray(value) && value.length === 0);
  }
}
