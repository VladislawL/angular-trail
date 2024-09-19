import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ProductGridComponent} from "../product-grid/product-grid.component";
import {FilterComponent} from "../filter/filter.component";
import {FilterParams} from "../shared/model/product";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductGridComponent, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  filterParams: FilterParams | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filterParams = {
        query: params['query'] || undefined,
        minPrice: params['minPrice'] ? +params['minPrice'] : undefined,
        maxPrice: params['maxPrice'] ? +params['maxPrice'] : undefined,
        stock: params['stock'] ? params['stock'] === 'true' : undefined,
        rating: params['rating'] ? +params['rating'] : undefined,
        reviews: params['reviews'] ? params['reviews'] === 'true' : undefined
      };
    });
  }

  handleFilters(filterParams: FilterParams) {
    const query = this.filterParams?.query;
    this.filterParams = filterParams;
    if (query != null) {
      this.filterParams.query = query;
    }
    this.updateUrlFilters();
  }

  handleSearch(query: string) {
    if (this.filterParams == null) {
      this.filterParams = {
        query: query,
        minPrice: undefined,
        maxPrice: undefined,
        stock: undefined,
        rating: undefined,
        reviews: undefined
      };
    } else {
      this.filterParams.query = query;
    }
    this.updateUrlFilters();
  }

  updateUrlFilters() {
    const queryParams: any = {};

    if (this.filterParams?.query && this.filterParams.query.toString() !== '') {
      queryParams['query'] = this.filterParams.query;
    }
    if (this.filterParams?.minPrice && this.filterParams.minPrice.toString() !== '') {
      queryParams['minPrice'] = this.filterParams.minPrice;
    }
    if (this.filterParams?.maxPrice && this.filterParams.maxPrice.toString() !== '') {
      queryParams['maxPrice'] = this.filterParams.maxPrice;
    }
    if (this.filterParams?.stock !== undefined && this.filterParams.stock.toString() !== '') {
      queryParams['stock'] = this.filterParams.stock;
    }
    if (this.filterParams?.rating && this.filterParams.rating.toString() !== '') {
      queryParams['rating'] = this.filterParams.rating;
    }
    if (this.filterParams?.reviews !== undefined && this.filterParams.reviews.toString() !== '') {
      queryParams['reviews'] = this.filterParams.reviews;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'replace'
    });
  }
}
