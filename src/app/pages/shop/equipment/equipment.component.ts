import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemType, Hero } from '../../../shared';
import { GameService, HeroService, ShopService } from '../../../shared';

@Component({
  selector: 'equipment',
	templateUrl: 'equipment.component.html'
})

export class EquipmentComponent implements OnInit {
  shopEquipment: { 
    equipment: {
        itemType: ItemType, 
        name: string,
        img: string,
        items: { value: number, cost: number}[] 
      }[],
    hitpoints: {
      img: string,
      items: { value: number, cost: number}[] 
    }
  };
  get choosenHero(): Hero {
    return this.shopService.choosenHero;
  }
  get equipment(): {
        itemType: ItemType, 
        name: string,
        img: string,
        items: { value: number, cost: number}[] 
      }[]{
    return this.shopEquipment.equipment;
  }
  get playerGold() {
    return this.gameService.gold;
  }

  constructor(
    public navCtrl: NavController,
    private gameService: GameService,
    private heroService: HeroService,
    private shopService: ShopService
  ) {
    // Id is 1, nav refers to Tab1
    console.log(this.navCtrl.id)

  }

  ngOnInit() {
    let that = this;
    this.shopService.getShopEquipment()
    .then(shopEquipment => { 
      this.shopEquipment = shopEquipment;
      this.shopEquipment.equipment.forEach(listItems => {
        listItems.items.forEach(item => {
          (item as any).countExists = function(): number {
            let countInInventory = that.gameService.inventory
            .filter(i => i.type === listItems.itemType && i.value === item.value)
            .length;
            let countInEquipment = that.heroService.heroes
            .reduce((sum, hero) => {
              return sum + hero.equipment.items
              .filter(i => i.type == listItems.itemType && i.value == item.value)
              .length;
            }, 0);
            return countInInventory + countInEquipment;
          }
        });
      });
    });
  }  
  isSelectedItem(itemType: ItemType, value: number) {
    return this.shopService.choosenItem 
      && this.shopService.choosenItem.itemType == itemType 
      && this.shopService.choosenItem.item.value == value;
  }
  isSelectedHitpoints(value: number) {
    return this.shopService.choosenHitpoints 
      && this.shopService.choosenHitpoints.value == value;
  }
  selectItem(itemType: ItemType, item: { value: number, cost: number}) {
    this.shopService.selectItem(itemType, item);
  }
  selectHitpoints(item: { value: number, cost: number}) {
    this.shopService.selectHitpoints(item);
  }
}