import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgIconComponent } from '@ng-icons/core';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';

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
  providers: [ConfirmationService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @Input() productInfo!: IProduct;

  @Output() deleteEvent = new EventEmitter<{
    id: string;
  }>();

  confirmDelete(event: Event) {
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
        this.onDelete();
      },
    });
  }

  onDelete() {
    this.deleteEvent.emit({
      id: String(this.productInfo.id ?? ''),
    });
  }
}
