import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Hero } from '@models';
import { MapPage } from '@pages';
import { HeroService } from '@services';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.page.html'
})
export class InventoryPage {
  selectedHero: Hero;

  get heroes(): Hero[] {
    return this.heroService.heroes;
  }
  get heroClassName() {
    return Hero.getHeroClassName(this.selectedHero.heroClass);
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private heroService: HeroService,
  ) {
    this.selectedHero = this.heroes[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

  choseHero(hero: Hero) {
    this.selectedHero = hero;
  }

  close() {
    console.log('openPage map');
    this.navCtrl.push(MapPage);
  }
}
