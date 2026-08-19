import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProductComponent {
  private readonly productService = inject(ProductService);
  product: Product = { pid: 0, pname: '', price: 0, brand: '' };
  isSubmitting = false;

  onSubmit(form: NgForm): void {
    if (form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        alert('Product added successfully.');
        form.resetForm({ pid: 0, pname: '', price: 0, brand: '' });
        this.isSubmitting = false;
      },
      error: () => {
        alert('Unable to add the product. Check that the server is running.');
        this.isSubmitting = false;
      }
    });
  }
}
