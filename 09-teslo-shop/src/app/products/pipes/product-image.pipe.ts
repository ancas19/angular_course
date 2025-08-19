import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';


const BASE_URL = environment.baseUrl;

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): any {
    if(!value || value.length === 0) {
      return './assets/images/no-image.jpg';
    }
    if (typeof value === 'string') {
      return `${BASE_URL}/files/product/${value}`;
    }
    return `${BASE_URL}/files/product/${value[0]}`;
  }
}
