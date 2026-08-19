import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-display-product',
  imports: [DecimalPipe],
  templateUrl: './display-product.html',
  styleUrl: './display-product.css'
})
export class DisplayProductComponent {
  private readonly productService = inject(ProductService);
  products = signal<Product[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor() {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.isLoading.set(true);
    this.productService.getAllProducts().subscribe({
      next: (products) => { this.products.set(products); this.isLoading.set(false); },
      error: () => {
        this.errorMessage.set('Unable to load products. Check that the server is running.');
        this.isLoading.set(false);
      }
    });
  }
}
