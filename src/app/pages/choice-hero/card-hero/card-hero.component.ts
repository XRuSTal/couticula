import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Hero, HeroSettings } from '@models';

@Component({
  selector: 'card-hero',
  templateUrl: 'card-hero.component.html',
})
export class CardHeroComponent {
  @Input() hero: HeroSettings;

  get heroClassName() {
    return Hero.getHeroClassName(this.hero.heroClass);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
