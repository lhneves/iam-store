import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { IProduct } from '../../models/product.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../service/product.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProduct: IProduct = {
    id: 1,
    code: 1,
    productName: 'Product 1',
    category: 'atacado',
  };

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'deleteProductById',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ProductCardComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        ConfirmationService,
        MessageService,
        { provide: ProductService, useValue: mockProductService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.productInfo = mockProduct;
    fixture.detectChanges();
  });

  it('should display the product details correctly', () => {
    const categoryEl = fixture.debugElement.query(
      By.css('[data-testid="category-data"]')
    ).nativeElement;
    const codeEl = fixture.debugElement.query(
      By.css('[data-testid="code-data"]')
    ).nativeElement;
    const nameEl = fixture.debugElement.query(
      By.css('[data-testid="product-name-data"]')
    ).nativeElement;

    expect(categoryEl.textContent).toContain('atacado');
    expect(codeEl.textContent).toContain('Código: #1');
    expect(nameEl.textContent).toContain('Product 1');
  });

  it('should navigate to the edit route when clicking edit button', () => {
    const editButton = fixture.debugElement.query(
      By.css('[data-testid="btn-edit"]')
    ).nativeElement;
    expect(editButton.getAttribute('href')).toBe('/product/1');
  });

  it('should call confirm dialog on button click', async () => {
    spyOn(component, 'confirmDelete');

    const deleteButton = fixture.debugElement.query(By.css('button'));
    deleteButton.nativeElement.click();

    expect(component.confirmDelete).toHaveBeenCalled();
  });

  it('should delete the product and emit deleteEvent on confirm', () => {
    mockProductService.deleteProductById.and.returnValue(of({}));
    spyOn(component.deleteEvent, 'emit');

    const deleteButton = fixture.debugElement.query(By.css('button'));
    deleteButton.nativeElement.click();

    fixture.detectChanges();

    const acceptBtn = fixture.debugElement.query(
      (debugEl) =>
        debugEl.name === 'button' && debugEl.nativeElement.textContent === 'Sim'
    );

    acceptBtn.nativeElement.click();

    expect(mockProductService.deleteProductById).toHaveBeenCalledWith('1');
    expect(component.deleteEvent.emit).toHaveBeenCalled();
  });
});
