import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { IProduct } from '../../models/product.model';

import { ProductService } from '../../service/product.service';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { ProductEditFormComponent } from '../../components/product-edit-form/product-edit-form.component';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [NgIf, HeaderComponent, ProductEditFormComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  productInfo: IProduct | null = null;
  errorMessage: string | null = null;

  name: string = '';

  category: string | undefined;
  categoryOptions: { label: string; value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('code');

    if (productId === null) {
      this.errorMessage =
        'Não foi possível adquirir o código do produto. Tente novamente.';
      return;
    }

    this.fetchProductById(Number(productId));

    this.categoryOptions = [
      { label: 'todos', value: 'todos' },
      { label: 'atacado', value: 'atacado' },
      { label: 'varejo', value: 'varejo' },
      { label: 'internacional', value: 'internacional' },
    ];

    this.category = this.productInfo?.category;
  }

  fetchProductById(id: number) {
    this.productService.getProducts({ id: id }).subscribe(
      (data) => {
        this.productInfo = data[0];
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage =
          'Não foi possível carregar o produto. Tente novamente.';
      }
    );
  }

  handleUpdateProduct(updateData: {
    id: number;
    code?: number;
    productName?: string;
    category?: string;
  }) {
    this.productService
      .updateProductById(updateData.id, {
        productName: updateData.productName,
        category: updateData.category,
      })
      .subscribe(() => {
        console.log('Product Updated');
        this.messageService.add({
          severity: 'success',
          summary: 'Atualizado',
          detail: 'Produto atualizado com sucesso',
        });
        this.fetchProductById(updateData.id);
      });
  }
}
