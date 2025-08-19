import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;


@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe,ProductImagePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  urlImage= `${BASE_URL}/files/product`;
  product=input.required<Product>();


 imageUrl=computed(() => {
    return `${this.urlImage}/${this.product().images[0]}`;
  });

}
