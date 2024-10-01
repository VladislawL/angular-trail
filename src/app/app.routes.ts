import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ProductDetailsComponent} from "./product/components/product-details/product-details.component";
import {ProductEditComponent} from "./product/components/product-edit/product-edit.component";
import {CartComponent} from "./cart/components/cart/cart.component";
import {authGuard} from "./auth/guards/auth.guard";
import {AuthComponent} from "./auth/components/auth/auth.component";

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
    canActivate: [authGuard],
    title: 'Edit Product'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart'
  },
  {
    path: 'auth/:mode',
    component: AuthComponent,
    title: 'Login Page'
  }
];
