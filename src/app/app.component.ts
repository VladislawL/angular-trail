import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/components/header/header.component";
import {FilterParams} from "./product/models/product";
import {SearchService} from "./search/services/search.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-shop';

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

  handleSearch(query: string) {
    if (this.filterParams == null) {
      this.filterParams = {
        query: query,
        minPrice: '',
        maxPrice: '',
        stock: '',
        rating: '',
        reviews: ''
      };
    } else {
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
