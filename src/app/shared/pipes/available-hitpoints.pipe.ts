import { Pipe, PipeTransform } from '@angular/core';

import { Hero } from '@models';

@Pipe({
  name: 'availableHitPoints',
  pure: false,
})
export class AvailableHitPointsPipe implements PipeTransform {
  transform(items: { value: number }[], hero: Hero): any[] {
    return items.filter(
      item => hero.maxAddonHitPoint >= item.value && hero.addonHitPoint < item.value
    );
  }
}
