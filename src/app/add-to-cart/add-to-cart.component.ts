import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {

  @Input()
  disabled: boolean = false;

  quantity: number = 0;
  cartAdded: boolean = false;

  changeQuantity(quantity: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.quantity + quantity > 0 || this.quantity < 5) {
      this.quantity += quantity;
    }
  }

  addToCart(event: Event) {
    this.cartAdded = true;
    this.changeQuantity(1, event);
  }

  removeFromCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.cartAdded = false;
    this.quantity = 0;
  }
}
