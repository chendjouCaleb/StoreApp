import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return value;
    }
    return value.toLocaleString() + ' FCFA';
  }
}

