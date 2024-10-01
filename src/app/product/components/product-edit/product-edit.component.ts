import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {AsyncPipe, CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    HeaderComponent,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  product$!: Observable<Product>;

  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')
      ]],
      stock: ['', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]*$')
      ]],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getProduct();
    this.product$.subscribe(product => {

      this.editForm.patchValue({
        title: product.title,
        price: product.price,
        image: product.image,
        stock: product.stock,
        description: product.description
      });
    });
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product$ = this.productService.getProduct(id);
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      this.productService.updateProduct(id!, this.editForm.value).subscribe({
        error: (e) => console.log(e),
        complete: () => alert('Product updated')
      });
    }
  }

  get title() {
    return this.editForm.get('title');
  }

  get price() {
    return this.editForm.get('price');
  }

  get stock() {
    return this.editForm.get('stock');
  }

  get description() {
    return this.editForm.get('description');
  }

  get image() {
    return this.editForm.get('image');
  }
}
