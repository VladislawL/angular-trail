import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FilterParams} from "../shared/model/product";

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
      minPrice: [''],
      maxPrice: [''],
      stock: [''],
      rating: [''],
      reviews: ['']
    });
  }

  onFilter() {
    this.filterParams.emit(this.filterForm.value);
  }

}
