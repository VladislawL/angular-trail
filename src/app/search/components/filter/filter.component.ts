import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FilterParams} from "../../../product/models/product";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Output()
  filterParams = new EventEmitter<FilterParams>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
