import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Hero, Item } from '@models';
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

  constructor(public navCtrl: NavController, private heroService: HeroService) {
    this.selectedHero = this.heroes[0];
  }

  choseHero(hero: Hero) {
    this.selectedHero = hero;
  }

  close() {
    this.navCtrl.pop();
  }

  getItemTypeImage(item: Item) {
    return Item.getItemTypeImage(item.type);
  }

  equipItem(item: Item) {
    this.heroService.equipItem(this.selectedHero.id, item);
  }
}
