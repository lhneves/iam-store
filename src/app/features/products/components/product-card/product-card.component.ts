import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgIconComponent } from '@ng-icons/core';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NgIconComponent,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productInfo!: IProduct;

  productService = inject(ProductService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  @Output() deleteEvent = new EventEmitter();

  onDelete() {
    this.deleteEvent.emit();
  }

  confirmDelete(event: Event) {
    console.log('chamou confirm delete');
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja cancelar esse produto?',
      header: 'Confirmação',
      icon: 'none',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text mr-2 p-button-lg',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.handleDeleteProduct({ id: String(this.productInfo.id ?? '') });
      },
    });
  }

  handleDeleteProduct(filters: { id: string }) {
    this.productService.deleteProductById(filters.id).subscribe((response) => {
      if (response.error) return;

      console.log('Product Deleted');
      this.messageService.add({
        severity: 'success',
        summary: 'Deletado',
        detail: 'Produto deletado com sucesso',
      });

      this.onDelete();
    });
  }
}
