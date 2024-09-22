import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartEntry} from "../shared/model/cart";
import {CartService} from "../shared/services/cart.service";
import {Router} from "@angular/router";
import {trigger, transition, state, animate, style, AnimationEvent} from "@angular/animations";

@Component({
  selector: 'app-cart-entry',
  standalone: true,
  imports: [],
  templateUrl: './cart-entry.component.html',
  styleUrl: './cart-entry.component.css',
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scaleY(1)' }))
      ])
    ])
  ],
})
export class CartEntryComponent {
  @Input()
  cartEntry!: CartEntry;

  @Output()
  removeEvent = new EventEmitter<void>();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  removeCartEntry(id: string) {
    this.cartService.removeCartEntry(id).subscribe({
      complete: () => console.log(`Entry ${id} removed`)
    });
    this.removeEvent.emit();
  }
}
