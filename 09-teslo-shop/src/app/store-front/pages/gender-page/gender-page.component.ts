import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { ProductCardComponent } from "@products/components/product-card/product-card.component";
import { map } from 'rxjs';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  paginationService=inject(PaginationService);
  idGender = toSignal(this.route.paramMap.pipe(
    map(params => params.get('gender') || '')));

  productsResource = rxResource({
    request: () => ({
      gender: this.idGender(),
      offset: (this.paginationService.currentpage()-1)*9
     }),
    loader: ({ request }) => {
      return this.productService.getProducts(request)
    }

  })

}
