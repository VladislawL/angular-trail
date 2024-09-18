import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {ProductGridComponent} from "../product-grid/product-grid.component";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductGridComponent, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
