import {Component} from '@angular/core';
import {HeaderComponent} from "../shared/components/header/header.component";
import {ProductGridComponent} from "../product/components/product-grid/product-grid.component";
import {FilterComponent} from "../search/components/filter/filter.component";
import {FilterParams} from "../product/models/product";
import {SearchService} from "../search/services/search.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductGridComponent, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private searchService: SearchService
  ) {}

  handleFilters(filterParams: FilterParams) {
    this.updateUrlFilters(filterParams);
  }

  updateUrlFilters(filterParams: FilterParams) {
    if (filterParams) {
      this.searchService.updateUrlFilters(filterParams);
    }
  }
}
