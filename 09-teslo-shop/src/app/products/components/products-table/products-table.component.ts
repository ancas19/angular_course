import { Component, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'products-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe,SlicePipe],
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  products = input.required<Product[]>();
}
