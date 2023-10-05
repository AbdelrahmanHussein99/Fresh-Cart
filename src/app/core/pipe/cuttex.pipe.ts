import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttex',
  standalone: true
})
export class CuttexPipe implements PipeTransform {

  transform(text:string,limit:number): string {
    return text.split(" ").slice(0,limit).join(" ");
  }

}
