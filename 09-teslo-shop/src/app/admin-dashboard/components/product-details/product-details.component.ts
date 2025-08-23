import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from '@dashboard/shared/form-error-label/form-error-label.component';
import { ProductService } from '@products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  product = input.required<Product>();
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  router = inject(Router);
  wasSaved = signal(false);
  tempImages = signal<string[]>([]);
  imageFileList: FileList | undefined = undefined;
  imagesToCarousel=computed(()=>{
    return [...this.product().images, ...this.tempImages()];
  })

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

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if (!isValid) return;
    const formValue = this.productForm.value;
    const productlike: Partial<Product> = {
      ... (formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').filter(val => val !== '').map(tag => tag.trim()) ?? [],
    }
    if (this.product().id === 'new') {
      const product = await firstValueFrom(
        this.productService.createProduct(productlike, this.imageFileList)
      );
      this.router.navigate(['/admin/product', product.id]);
      this.wasSaved.set(true);
      this.showAlert();
      return;
    }
    await firstValueFrom(this.productService.updateProduct(productlike, this.product().id ?? '', this.imageFileList));
    this.wasSaved.set(true);
    this.showAlert();
  }

  onFileChanges(event: Event) {
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;
    this.tempImages.set([]);
    const imagesUrls = Array.from(fileList ?? []).map((file) =>
      URL.createObjectURL(file)
    );
    this.tempImages.set(imagesUrls);
  }


  private showAlert() {
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
}
