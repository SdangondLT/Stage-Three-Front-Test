import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log('value', value)
    console.log('args', args)
    return null;
  }

}
