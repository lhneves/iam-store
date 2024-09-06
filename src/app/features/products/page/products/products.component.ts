import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductService } from '../../service/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NgIconComponent } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-product-page',
  imports: [
    NgIconComponent,
    ButtonModule,
    HttpClientModule,
    CommonModule,
    ProductSearchComponent,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductPageComponent {
  products: any[] = [];
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Error fetching products';
      }
    );
  }

  handleSearch(filters: { code: string; category: string }) {
    console.log(filters);
    this.productService
      .getProducts(filters.code, filters.category)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
