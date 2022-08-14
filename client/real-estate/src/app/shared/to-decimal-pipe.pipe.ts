import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDecimalPipe'
})
export class ToDecimalPipePipe implements PipeTransform {

  transform(value: number,): string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  }

}

//  transform(value: string, limit: number = 10): string {
//     if (value.length > limit) {
//       return `${value.substring(0, limit - 3)}...`;
//     }

//     return value;
//   }