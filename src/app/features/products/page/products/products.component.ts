import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ProductService } from '../../service/product.service';

import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductRegisterFormComponent } from '../../components/product-register-form/product-register-form.component';

import { IProduct } from '../../models/product.model';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-product-page',
  imports: [
    CommonModule,
    ProductSearchComponent,
    ProductCardComponent,
    ProductRegisterFormComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './products.component.html',
})
export class ProductPageComponent {
  products: IProduct[] = [];
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

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

  handleDeleteProduct(filters: { id: string }) {
    this.productService.deleteProductById(filters.id).subscribe(() => {
      console.log('Product Deleted');
      this.messageService.add({
        severity: 'success',
        summary: 'Deletado',
        detail: 'Produto deletado com sucesso',
      });
      this.fetchProducts();
    });
  }

  handleCreateProduct() {
    this.fetchProducts();
  }
}
