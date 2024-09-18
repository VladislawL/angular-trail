import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {AddToCartComponent} from "../add-to-cart/add-to-cart.component";
import {Product} from "../shared/model/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../shared/services/product.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Review} from "../shared/model/review";
import {StockStatusComponent} from "../stock-status/stock-status.component";
import {StockStatus} from "../shared/enums/stock";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HeaderComponent,
    AddToCartComponent,
    AsyncPipe,
    NgIf,
    NgForOf,
    StockStatusComponent
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
