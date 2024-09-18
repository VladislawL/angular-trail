import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {CartComponent} from "./cart/cart.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {authGuard} from "./shared/guards/auth.guard";

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
    path: 'auth',
    component: LoginComponent,
    title: 'Login Page'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign Up'
  }
];
