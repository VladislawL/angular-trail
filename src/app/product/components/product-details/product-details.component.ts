import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {AddToCartComponent} from "../../../cart/components/add-to-cart/add-to-cart.component";
import {Product} from "../../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Review} from "../../models/review";
import {StockStatusDirective} from "../../directives/stock-status/stock-status.directive";
import {StockStatus} from "../../../cart/models/stock";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HeaderComponent,
    AddToCartComponent,
    AsyncPipe,
    NgIf,
    NgForOf,
    StockStatusDirective
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product>;
  reviews$!: Observable<Review[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product$ = this.productService.getProduct(id);
    this.product$.subscribe(product => {
      this.reviews$ = this.getReviews(product);
    })
  }

  getReviews(product: Product): Observable<Review[]> {
    return this.productService.getReviewsByProductId(product.id);
  }

  getStock(product: Product): StockStatus {
    if (product.stock === 0) {
      return StockStatus.OutOfStock;
    } else if (product.stock < 10) {
      return StockStatus.AlmostSoldOut;
    } else {
      return StockStatus.InStock;
    }
  }

  isProductPurchasable(product: Product): boolean {
    return this.productService.isProductPurchasable(product);
  }
}
