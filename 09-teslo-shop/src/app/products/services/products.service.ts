import { Gender, ProductsResponse } from './../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Options } from '../interfaces/options.interface';
import { User } from '../../auth/interfaces/user.interface';

const BASE_URL = environment.baseUrl;



@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();
  emptyProduct: Product = {
    id: 'new',
    title: '',
    description: '',
    price: 0,
    slug: '',
    stock: 0,
    sizes: [],
    gender: Gender.Kid,
    tags: [],
    images: [],
    user: {} as User
  };

  getProducts(options: Options): Observable<ProductsResponse> {
    const {
      limit = 10,
      offset = 0,
      gender = ''
    } = options;
    const cacheKey = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(cacheKey)) {
      return of(this.productsCache.get(cacheKey)!);
    }
    return this.http.get<ProductsResponse>(`${BASE_URL}/products`, {
      params: {
        limit: limit,
        offset: offset,
        gender: gender
      }
    })
      .pipe(
        tap((response) => this.productsCache.set(cacheKey, response))
      );
  }

  getProductBySlug(slug: string): Observable<Product> {
    if (this.productCache.has(slug)) {
      return of(this.productCache.get(slug)!);
    }
    return this.http.get<Product>(`${BASE_URL}/products/${slug}`).pipe(
      delay(2000),
      tap((response) => this.productCache.set(slug, response))
    );
  }

  getProductById(id: string): Observable<Product> {
    if(id==='new'){
      return of(this.emptyProduct); // Return empty product for new product creation
    }
    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!);
    }
    return this.http.get<Product>(`${BASE_URL}/products/${id}`).pipe(
      delay(2000),
      tap((response) => this.productCache.set(id, response))
    );
  }

  updateProduct(product: Partial<Product>, id: string): Observable<Product> {
    return this.http.patch<Product>(`${BASE_URL}/products/${id}`, product)
      .pipe(
        tap((response) => this.updateProductCache(response))
      );
  }


  updateProductCache(product: Product): void {
    const id = product.id;
    if (this.productCache.has(id)) {
      this.productCache.set(id, product);
    }
    this.productsCache.forEach(response => {
      response.products = response.products.map((currentProduct) => {
        return currentProduct.id === id ? product : currentProduct;
      })
    });
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${BASE_URL}/products`, product)
      .pipe(
        tap((response) => this.updateProductCache(response))
      );
  }

}
