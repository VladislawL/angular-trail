import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductTileComponent} from "../product-tile/product-tile.component";
import {FilterParams, Product} from "../shared/model/product";
import {ProductService} from "../shared/services/product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductTileComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductGridComponent implements OnChanges {

  @Input()
  filterParams: FilterParams | undefined;

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts(this.filterParams);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterParams']) {
      this.products$ = this.productService.getProducts(this.filterParams);
    }
  }

  hasFilters(): boolean {
    return !!this.filterParams && (this.filterParams.minPrice != undefined || this.filterParams.maxPrice != undefined || this.filterParams.stock != undefined || this.filterParams.rating != undefined || this.filterParams.reviews != undefined);
  }

  removeFilter(filterKey: string): void {
    if (this.filterParams) {
      (this.filterParams as any)[filterKey] = undefined;
      this.products$ = this.productService.getProducts(this.filterParams);
    }
  }

  removeAllFilters() {
    this.filterParams = undefined;
    this.products$ = this.productService.getProducts(this.filterParams);
  }
}
