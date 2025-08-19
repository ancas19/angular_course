import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  private idSlug = signal(this.route.snapshot.paramMap.get('idSlug') || '');

  productsResource = rxResource({
    request: () => ({slug: this.idSlug()}),
    loader: ({ request }) => {
      return this.productService.getProductBySlug(request.slug);
    }
  });

}
