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
export class ProductGridComponent implements OnChanges{

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

}
