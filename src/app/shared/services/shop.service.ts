import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { ItemType } from '@enums';
import { Ability, Hero, ShopEquipmentHitpoints } from '@models';
import { ShopAbilities, ShopEquipments } from '@shared/db';
import { ItemFabric } from '@shared/fabrics';

import { HeroService } from './hero.service';
import { HttpService } from './http.service';
import { PlayerService } from './player.service';
import { SettingsService } from './settings.service';

@Injectable()
export class ShopService {
  choosenHero: Hero;
  choosenItem: { itemType: ItemType, item: { value: number, cost: number} };
  choosenHitpoints: { value: number, cost: number};
  //selectedHitpoints = new EventEmitter<any>();
  selectedItem$: Observable<boolean>;
  //selectedHitpoints$: Observable<any>;

  private selectedItemSource: Subject<boolean> = new Subject<boolean>();

  constructor(
    //private httpService: HttpService,
    private heroService: HeroService,
    private playerService: PlayerService,
    private settingsService: SettingsService
  ){
    this.selectedItem$ = this.selectedItemSource.asObservable();
  }

  getHeroPrice(): Promise<number> {
    return new Promise((resolve, reject) => {
      let price;
      switch (this.heroService.heroes.length) {
        case 1: price = this.settingsService.priceSecondHero;
        break;
        case 2: price = this.settingsService.priceThirdHero;
        break;
        default:
        return reject(null);
      }
      return resolve(price);
    });
  }
  getShopEquipment(): Observable<ShopEquipmentHitpoints> {
    return of(ShopEquipments);
  }
  getShopAbilites(): Observable<Ability[]> {
    return of(ShopAbilities);
  }
  selectHero(hero: Hero) {
    this.choosenHero = hero;
  }
  selectItem(itemType: ItemType, item: { value: number, cost: number}) {
    if (this.choosenItem && this.choosenItem.itemType == itemType
      && this.choosenItem.item.value == item.value) {
        this.choosenItem = null;
        this.selectedItemSource.next(false);
    }
    else if (this.playerService.gold >= item.cost){
      this.choosenHitpoints = null;
      this.choosenItem = {itemType: itemType, item: item };
      this.selectedItemSource.next(true);
    }
  }
  selectHitpoints(item: { value: number, cost: number}) {
    if (this.choosenHitpoints && this.choosenHitpoints.value == item.value) {
        this.choosenHitpoints = null;
        this.selectedItemSource.next(false);
    }
    else if (this.playerService.gold >= item.cost){
      this.choosenItem = null;
      this.choosenHitpoints = item;
      this.selectedItemSource.next(true);
    }
  }
  isNewHeroAvailable(): Promise<boolean> {
     return new Promise(resolve => {
      this.getHeroPrice().then(price => {
        resolve(this.playerService.gold >= price);
      })
      .catch(() => resolve(false));
    });
  }
  isItemAvailable(price: number): Promise<boolean> {
     return new Promise(resolve => {
       resolve(this.playerService.gold >= price)
    });
  }
  buyNewHero(): Promise<boolean> {
    return new Promise(resolve => {
      this.getHeroPrice().then(price => {
        if (this.playerService.gold >= price) {
          this.playerService.decreaseGold(price)
          .then(success => {
            resolve(success);
          });
        }
        else
          resolve(false);
      })
      .catch(() => resolve(false));
    });
  }
  buy() {
    if (this.choosenHitpoints != null){
      this.buyHitpoint(this.choosenHero)
      .then(() => {
        this.choosenHitpoints = null;
      });
    }
    else if (this.choosenItem != null){
      this.buyItem(this.choosenHero)
      .then(() => {
        this.choosenItem = null;
      });
    }
    this.selectedItemSource.next(false);
  }

  buyHitpoint(hero: Hero): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      this.getShopEquipment().subscribe(shopEquipment => {
        let hitpoints = shopEquipment.hitpoints.items.find(p => p.value === this.choosenHitpoints.value);
        if (hitpoints) {
          let currentHero = this.heroService.heroes.find(p => p.id === hero.id);
          if (currentHero.addonHitPoint < hitpoints.value && currentHero.maxAddonHitPoint >= hitpoints.value) {
            this.playerService.decreaseGold(hitpoints.cost)
            .then(success => {
              if (success) {
                currentHero.setAddonHitPoints(hitpoints.value);
              }
              resolve(success);
            });
          }
        }
      });
    });
  }
  buyItem(hero: Hero){
    return new Promise<boolean>(resolve => {
      this.getShopEquipment().subscribe(shopEquipment => {
        let item = shopEquipment.equipment
        .find(p => p.itemType === this.choosenItem.itemType)
        .items.find(p => p.value === this.choosenItem.item.value);
        if (item) {
          let currentHero = this.heroService.heroes.find(p => p.id === hero.id);
          if (currentHero.maxItemValue >= item.value) {
            this.playerService.decreaseGold(item.cost)
            .then(success => {
              if (success) {
                let newItem = ItemFabric.createItem(this.choosenItem.itemType, item.value);
                this.heroService.equipItem(hero.id, newItem)
                .then(success => {
                  if (!success) {
                    this.playerService.addonInventory(newItem);
                  }
                  resolve(success);
                });
              }
            });
          }
        }
      });
    });
  }
}
