import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Hero, Item } from '@models';
import { MapPage } from '@pages';
import { HeroService } from '@services';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.page.html',
})
export class InventoryPage {
  selectedHero: Hero;

  get heroEquipment() {
    return this.selectedHero.equipment.items;
  }
  get heroInventory() {
    return this.selectedHero.inventory;
  }
  get heroes() {
    return this.heroService.heroes;
  }
  get heroClassName() {
    return Hero.getHeroClassName(this.selectedHero.heroClass);
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private heroService: HeroService
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

  getItemTypeImage(item: Item) {
    return Item.getItemTypeImage(item.type);
  }

  equipItem(item: Item) {
    this.heroService.equipItem(this.selectedHero.id, item);
  }
}
