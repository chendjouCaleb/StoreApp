import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) {
      return value;
    }
    const inverse = value.toString().split('').reverse().join('');
    const phone = [];

    for (let i = 0; i < inverse.length; i++) {
      if (i !== 0 && i % 2 === 0) {
        phone[i] = inverse[i] + ' ';
      } else {
        phone[i] = inverse[i];
      }
    }

    return phone.reverse().join('');
  }
}

