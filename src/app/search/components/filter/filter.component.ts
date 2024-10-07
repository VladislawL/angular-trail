import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FilterParams} from "../../../product/models/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {

  @Output()
  filterParams = new EventEmitter<FilterParams>();

  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.filterForm = this.fb.group({
      minPrice: ['', [
        Validators.min(0)
      ]],
      maxPrice: ['', [
        Validators.min(0)
      ]],
      stock: [''],
      rating: [''],
      reviews: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const filterParams: FilterParams = {
        minPrice: params['minPrice'] || '',
        maxPrice: params['maxPrice'] || '',
        stock: params['stock'] || '',
        rating: params['rating'] || '',
        reviews: params['reviews'] || '',
        query: params['query'] || ''
      };
      this.filterForm.patchValue(filterParams);
    });
  }

  onFilter() {
    this.filterParams.emit(this.filterForm.value);
  }

  get minPrice() {
    return this.filterForm.get('minPrice') as FormControl;
  }

  get maxPrice() {
    return this.filterForm.get('maxPrice') as FormControl;
  }

}
