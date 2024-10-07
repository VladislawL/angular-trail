import { Injectable } from '@angular/core';
import {FilterParams} from "../../product/models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ParamsMapping} from "../../shared/models/params-mapping";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
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

  getFilterParams(): FilterParams {
    const params = this.route.snapshot.queryParams;
    return {
      query: params['query'] || '',
      minPrice: params['minPrice'] || '',
      maxPrice: params['maxPrice'] || '',
      stock: params['stock'] || '',
      rating: params['rating'] || '',
      reviews: params['rating.count'] || ''
    };
  }
}
