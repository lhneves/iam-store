import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { IProduct } from '../../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-edit-form',
  standalone: true,
  imports: [
    NgIconComponent,
    RouterModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './product-edit-form.component.html',
})
export class ProductEditFormComponent implements OnInit {
  @Input() productInfo!: IProduct | null;

  productName: string | undefined;
  category: string | undefined;
  categoryOptions: { label: string; value: string }[] = [];

  @Output() updateEvent = new EventEmitter<{
    id: number;
    productName?: string;
    category?: string;
    code?: number;
  }>();

  ngOnInit() {
    this.categoryOptions = [
      { label: 'todos', value: 'todos' },
      { label: 'atacado', value: 'atacado' },
      { label: 'varejo', value: 'varejo' },
      { label: 'internacional', value: 'internacional' },
    ];

    this.category = this.productInfo?.category;
  }

  onEdit() {
    if (!this.productInfo || !this.productName || !this.category) return;

    this.updateEvent.emit({
      id: this.productInfo.id,
      productName: this.productName,
      category: this.category,
      code: this.productInfo.code,
    });
  }
}
