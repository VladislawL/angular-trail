import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {StockStatus} from "../../../cart/models/stock";

@Directive({
  selector: '[stockStatus]',
  standalone: true
})
export class StockStatusDirective implements OnInit {
  @Input('stockStatus') stock!: StockStatus;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const nativeElement = this.el.nativeElement;

    const stockDiv = this.renderer.createElement('div');
    this.renderer.addClass(stockDiv, 'stock-status');

    const stockText = this.renderer.createElement('span');

    switch (this.stock) {
      case StockStatus.InStock:
        this.renderer.addClass(stockDiv, 'in-stock');
        this.renderer.appendChild(stockText, this.renderer.createText('In Stock'));
        break;
      case StockStatus.OutOfStock:
        this.renderer.addClass(stockDiv, 'out-of-stock');
        this.renderer.appendChild(stockText, this.renderer.createText('Out of Stock'));
        break;
      case StockStatus.AlmostSoldOut:
        this.renderer.addClass(stockDiv, 'limited-stock');
        this.renderer.appendChild(stockText, this.renderer.createText('Almost Sold Out'));
        break;
      default:
        this.renderer.addClass(stockDiv, 'unknown-stock');
        this.renderer.appendChild(stockText, this.renderer.createText('Status Unknown'));
        break;
    }

    this.renderer.appendChild(stockDiv, stockText);
    this.renderer.appendChild(nativeElement, stockDiv);
  }
}
