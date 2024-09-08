import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ProductService } from '../../service/product.service';

import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductRegisterFormComponent } from '../../components/product-register-form/product-register-form.component';

import { IProduct } from '../../models/product.model';

@Component({
  standalone: true,
  selector: 'app-product-page',
  imports: [
    CommonModule,
    ProductSearchComponent,
    ProductCardComponent,
    ProductRegisterFormComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductPageComponent {
  products: IProduct[] = [];
  errorMessage: string | null = null;

  productService = inject(ProductService);

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts({}).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage =
          'Não foi possível carregar os produtos. Tente novamente';
      }
    );
  }

  handleSearch(filters: { code: string; category: string }) {
    this.productService
      .getProducts({ code: filters.code, category: filters.category })
      .subscribe((data) => {
        this.products = data;
      });
  }

  refetchProducts() {
    this.fetchProducts();
  }
}
