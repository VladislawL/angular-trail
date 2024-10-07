import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductTileComponent} from "../product-tile/product-tile.component";
import {FilterParams, Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {Observable} from "rxjs";
import {SearchService} from "../../../search/services/search.service";
import {FilterParamMapping} from "../../../search/model/filter-param-mapping";
import {FilterBadge} from "../../../search/model/filter-badge";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductTileComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductGridComponent implements OnInit {

  filterParams: FilterParams = {
    query: '',
    minPrice: '',
    maxPrice: '',
    stock: '',
    rating: '',
    reviews: ''
  };

  products$!: Observable<Product[]>;

  filterBadges: FilterBadge[] = [];

  filterParamMapping: FilterParamMapping = {
    query: { label: 'Search' },
    minPrice: { label: 'Min Price' },
    maxPrice: { label: 'Max Price' },
    stock: {
      label: 'Stock',
      valueProcessor: (value: string) => value === 'available' ? 'Available' : 'Not Available'
    },
    rating: {
      label: 'Rating',
      valueProcessor: (value: number) => value.toString()
    },
    reviews: {
      label: 'Reviews',
      valueProcessor: (value: string) => value === 'available' ? 'Present' : 'Not Present'
    }
  };

  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filterParams = this.searchService.getFilterParams();
      this.products$ = this.productService.getProducts(this.filterParams);
      this.updateFilterBadges();
    });
  }

  hasFilters(): boolean {
    return this.filterBadges.length > 0;
  }

  updateFilterBadges(): void {
    this.filterBadges = [];

    Object.keys(this.filterParamMapping).forEach(key => {
      const filterValue = (this.filterParams as any)[key];
      if (filterValue) {
        const { label, valueProcessor } = this.filterParamMapping[key];
        this.filterBadges.push({
          key: key,
          label: label,
          value: valueProcessor ? valueProcessor(filterValue) : filterValue
        });
      }
    });
  }

  removeFilter(filterKey: string): void {
    if (this.filterParams) {
      (this.filterParams as any)[filterKey] = undefined;
      this.products$ = this.productService.getProducts(this.filterParams);
      this.searchService.updateUrlFilters(this.filterParams);
      this.updateFilterBadges();
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
    this.updateFilterBadges();
  }
}
