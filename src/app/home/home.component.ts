import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../shared/components/header/header.component";
import {ProductGridComponent} from "../product/components/product-grid/product-grid.component";
import {FilterComponent} from "../search/components/filter/filter.component";
import {FilterParams} from "../product/models/product";
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../search/services/search.service";

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
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filterParams = {
        query: params['query'] || undefined,
        minPrice: params['minPrice'] ? params['minPrice'] : undefined,
        maxPrice: params['maxPrice'] ? params['maxPrice'] : undefined,
        stock: params['stock'] ? params['stock'] : undefined,
        rating: params['rating'] ? params['rating'] : undefined,
        reviews: params['reviews'] ? params['reviews'] : undefined
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

  updateUrlFilters() {
    if (this.filterParams) {
      this.searchService.updateUrlFilters(this.filterParams);
    }
  }
}
