import { Injectable } from '@angular/core';
import {FilterParams} from "../../product/models/product";
import {Router} from "@angular/router";
import {ParamsMapping} from "../../shared/models/params-mapping";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private router: Router
  ) {}

  updateUrlFilters(filterParams: FilterParams) {
    const paramsMapping: ParamsMapping = {
      query: { route: 'query', queryParam: 'query' },
      minPrice: { route: 'minPrice', queryParam: 'minPrice' },
      maxPrice: { route: 'maxPrice', queryParam: 'maxPrice' },
      stock: { route: 'inStock', queryParam: 'stock' },
      rating: { route: 'rating', queryParam: 'rating' },
      reviews: { route: 'hasReviews', queryParam: 'rating.count' }
    };

    const queryParams: any = {};

    Object.keys(paramsMapping).forEach(key => {
      const filterValue = (filterParams as any)[key];
      if (filterValue !== undefined && filterValue.toString() !== '') {
        const mapping = paramsMapping[key];

        if (typeof mapping.queryParam === 'function') {
          const [keyName, keyValue] = mapping.queryParam(filterValue).split('=');
          queryParams[keyName] = keyValue;
        } else {
          queryParams[mapping.queryParam] = filterValue;
        }
      }
    });

    this.router.navigate(['/'], {
      queryParams: queryParams,
      queryParamsHandling: 'replace'
    });
  }
}
