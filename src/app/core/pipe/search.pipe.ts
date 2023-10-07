import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(Product:Product[],term:string): Product[] {
    return Product.filter((item) => item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()) );
  }

}
