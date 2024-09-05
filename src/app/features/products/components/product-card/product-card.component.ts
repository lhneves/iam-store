import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgIconComponent } from '@ng-icons/core';

import { ButtonModule } from 'primeng/button';

import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIconComponent, ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productInfo!: IProduct;
}
