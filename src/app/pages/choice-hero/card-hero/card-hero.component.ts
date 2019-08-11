import { Component, Input } from '@angular/core';

import { Hero, HeroSettings } from '@models';

@Component({
  selector: 'card-hero',
  templateUrl: 'card-hero.component.html',
  styleUrls: ['card-hero.component.scss'],
})
export class CardHeroComponent {
  @Input()
  hero: HeroSettings;

  get heroClassName() {
    return Hero.getHeroClassName(this.hero.heroClass);
  }
  constructor() {}
}
