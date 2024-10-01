import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductTileComponent} from "../product-tile/product-tile.component";
import {FilterParams, Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Observable} from "rxjs";
import {SearchService} from "../../../search/services/search.service";
import {isNotEmpty} from "../../../shared/utils/utils";

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

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {
    this.products$ = this.productService.getProducts(this.filterParams);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterParams']) {
      this.products$ = this.productService.getProducts(this.filterParams);
    }
  }

  hasFilters(): boolean {
    if (!this.filterParams) {
      return false;
    }

    const { minPrice, maxPrice, stock, rating, reviews } = this.filterParams;

    return [minPrice, maxPrice, stock, rating, reviews].some(filter => isNotEmpty(filter));
  }

  removeFilter(filterKey: string): void {
    if (this.filterParams) {
      (this.filterParams as any)[filterKey] = undefined;
      this.products$ = this.productService.getProducts(this.filterParams);
      this.searchService.updateUrlFilters(this.filterParams)
    }
  }

  removeAllFilters() {
    this.filterParams = {
      query: '',
      minPrice: '',
      maxPrice: '',
      stock: '',
      rating: '',
      reviews: ''
    };
    this.products$ = this.productService.getProducts(this.filterParams);
    this.searchService.updateUrlFilters(this.filterParams);
  }
}
