import {Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {StockStatus} from "../shared/enums/stock";

@Component({
  selector: 'app-stock-status',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  templateUrl: './stock-status.component.html',
  styleUrl: './stock-status.component.css'
})
export class StockStatusComponent {
  @Input()
  stock!: StockStatus;
  protected readonly StockStatus = StockStatus;
}
