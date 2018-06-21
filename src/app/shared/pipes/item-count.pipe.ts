
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'itemCount'})
export class ItemCountPipe implements PipeTransform {
  transform(value: number): string {
    return value === 0 ? '' : `(${value})`;
  }
}