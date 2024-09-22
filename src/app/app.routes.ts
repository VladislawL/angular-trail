import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {CartComponent} from "./cart/cart.component";

export const routes: Routes = [
  {
      path: '',
      component: HomeComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    title: 'Product Details'
  },
  {
    path: 'product/edit/:id',
    component: ProductEditComponent,
    title: 'Edit Product'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart'
  }
];
