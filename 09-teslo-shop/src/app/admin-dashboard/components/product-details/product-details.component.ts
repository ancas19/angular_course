import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from '@dashboard/shared/form-error-label/form-error-label.component';
import { ProductService } from '@products/services/products.service';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<Product>();
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]] // Updated regex pattern
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  ngOnInit(): void {
    this.setFormValue(this.product());
  }
  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(', ') });

    // this.productForm.patchValue(formLike as any);
  }

  onSizeClicked(size: string) {
    const curretnSizes = this.productForm.value.sizes ?? [];
    if (curretnSizes.includes(size)) {
      curretnSizes.splice(curretnSizes.indexOf(size), 1)
      this.productForm.patchValue({ sizes: curretnSizes })
      return;
    }
    curretnSizes.push(size);
    this.productForm.patchValue({ sizes: curretnSizes })
  }

  onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if (!isValid) return;
    const formValue = this.productForm.value;
    const productlike: Partial<Product> = {
      ... (formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').filter(val => val !== '').map(tag => tag.trim()) ?? [],
    }
    this.productService.updateProduct(productlike, this.product().id ?? '').subscribe();
  }
}
