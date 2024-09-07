import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../service/product.service';
import { MessageService } from 'primeng/api';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-register-form',
  standalone: true,
  imports: [
    NgIf,
    NgIconComponent,
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  providers: [MessageService],
  templateUrl: './product-register-form.component.html',
  styleUrl: './product-register-form.component.css',
})
export class ProductRegisterFormComponent implements OnInit {
  visible!: boolean;
  errorMessage!: string | null;

  registerForm: FormGroup;
  productService = inject(ProductService);
  messageService = inject(MessageService);

  categoryOptions: { label: string; value: string }[] = [];

  @Output() createEvent = new EventEmitter();

  onCreate() {
    this.createEvent.emit();
  }

  constructor() {
    this.registerForm = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      productName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      category: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.categoryOptions = [
      { label: 'todos', value: 'todos' },
      { label: 'atacado', value: 'atacado' },
      { label: 'varejo', value: 'varejo' },
      { label: 'internacional', value: 'internacional' },
    ];
  }

  handleCreateProduct() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    const product: Omit<IProduct, 'id'> = this.registerForm.value;
    this.productService.createProduct(product).subscribe((response) => {
      if (response.error) {
        this.errorMessage = response.error;
      } else {
        console.log('Product Created');
        this.messageService.add({
          severity: 'success',
          summary: 'Criado',
          detail: 'Produto criado com sucesso',
        });
        this.registerForm.reset();
        this.onCreate();
        this.visible = false;
      }
    });
  }
}
