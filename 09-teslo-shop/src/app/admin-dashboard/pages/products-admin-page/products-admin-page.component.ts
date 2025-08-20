import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsTableComponent } from "@products/components/products-table/products-table.component";
import { ProductService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page+',
  imports: [ProductsTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productService=inject(ProductService);
  paginationService=inject(PaginationService);
  limit=signal(9);

  productsResource = rxResource({
    request: () => ({page: this.paginationService.currentpage()-1,limit:this.limit()}),
    loader: ({ request }) => {
      return this.productService.getProducts(
        {
          offset: request.page*9,
          limit: request.limit
        }
      )
    }

  })
}
