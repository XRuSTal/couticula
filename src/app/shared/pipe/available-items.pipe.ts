import { Pipe, PipeTransform } from '@angular/core';
import { Hero }  from '../index';
@Pipe({name: 'availableItems'})
export class AvailableItemsPipe implements PipeTransform {
  transform(items: { value: number }[], hero: Hero): any[] {
    return items.filter(item => hero.maxItemValue >= item.value);
  }
}