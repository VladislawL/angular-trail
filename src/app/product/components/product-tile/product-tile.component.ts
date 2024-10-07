import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Product} from "../../models/product";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AddToCartComponent} from "../../../cart/components/add-to-cart/add-to-cart.component";

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [
    RouterLink, CommonModule, AddToCartComponent
  ],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductTileComponent {
  @Input()
  product!: Product;
}
