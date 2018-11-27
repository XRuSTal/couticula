import { Component, Input } from '@angular/core';

import { Hero } from '@models';

@Component({
  selector: 'hero-info-short',
  templateUrl: 'hero-info-short.component.html',
})
export class HeroInfoShortComponent {
  @Input() hero: Hero;
  @Input() isSelected: boolean;

  get isBigValueHitPoints() {
    return this.hero.hitPoint >= 100;
  }
}
