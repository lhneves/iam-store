import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
})
export class ProductSearchComponent implements OnInit {
  code!: number;
  category: string = 'todos';
  categoryOptions: { label: string; value: string }[] = [];

  @Output() searchEvent = new EventEmitter<{
    code: string;
    category: string;
  }>();

  ngOnInit() {
    this.categoryOptions = [
      { label: 'todos', value: 'todos' },
      { label: 'atacado', value: 'atacado' },
      { label: 'varejo', value: 'varejo' },
      { label: 'internacional', value: 'internacional' },
    ];
  }

  onSearch() {
    this.searchEvent.emit({
      code: String(this.code ?? ''),
      category: this.category,
    });
  }
}
