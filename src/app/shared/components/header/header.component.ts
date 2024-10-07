import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {NgIf} from "@angular/common";
import {LoginService} from "../../../auth/services/login.service";
import {FilterParams} from "../../../product/models/product";
import {SearchService} from "../../../search/services/search.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, FormsModule, NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  query: string = '';

  filterParams: FilterParams | undefined;

  constructor(
    private loginService: LoginService,
    private searchService: SearchService,
    private route: ActivatedRoute
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

  onSearch() {
    if (this.filterParams == null) {
      this.filterParams = {
        query: this.query,
        minPrice: '',
        maxPrice: '',
        stock: '',
        rating: '',
        reviews: ''
      };
    } else {
      this.filterParams.query = this.query;
    }
    this.updateUrlFilters();
  }

  logout() {
    this.loginService.logout();
  }

  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }

  updateUrlFilters() {
    if (this.filterParams) {
      this.searchService.updateUrlFilters(this.filterParams);
    }
  }
}
