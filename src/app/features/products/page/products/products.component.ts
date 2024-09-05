// src/app/components/product-page/product-page.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-page',
  imports: [CommonModule, ProductCardComponent],
  template: `<p>products page works</p>`,
})
export class ProductPageComponent {
  products: any[] = [];

  constructor() {}
}
