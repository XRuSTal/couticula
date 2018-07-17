import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { ItemType, ShopPageType } from '@enums';
import { Ability, Hero, ShopAbilitiesPages, ShopEquipmentHitpoints } from '@models';
import {
  ShopAbilitiesAttack, ShopAbilitiesDefence, ShopAbilitiesHeal, ShopAbilitiesMagic, ShopAbilitiesSpecial,
  ShopEquipments,
} from '@shared/db';
import { ItemFabric } from '@shared/fabrics';

import { HeroService } from './hero.service';
import { HttpService } from './http.service';
import { PlayerService } from './player.service';
import { SettingsService } from './settings.service';

/**
 * Хранит состояние магазина:
 * - текущий раздел
 * - выбранная позиция раздела
 * - доступность покупки выбранной позиции
 */
@Injectable()
export class ShopService {
  choosenHero: Hero;
  choosenAbilities: { pageType: ShopPageType, ability: Ability }[] = [];
  choosenItem: { itemType: ItemType, item: { value: number, cost: number} };
  choosenHitpoints: { value: number, cost: number};
  choosenPageType: ShopPageType;
  isSelectedAvailable$: Observable<boolean>;


  private isSelectedAvailableSource: Subject<boolean> = new Subject<boolean>();

  get choosenAbility() {
    const ability = this.choosenAbilities.filter(p => p.pageType === this.choosenPageType);
    return ability.length ? ability[0].ability : null;
  }
  constructor(
    //private httpService: HttpService,
    private heroService: HeroService,
    private playerService: PlayerService,
    private settingsService: SettingsService
  ){
    this.isSelectedAvailable$ = this.isSelectedAvailableSource.asObservable();
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
  getShopAbilitesPages(): Observable<ShopAbilitiesPages> {
    const shopAbilitiesPages = new ShopAbilitiesPages(
      ShopAbilitiesAttack,
      ShopAbilitiesDefence,
      ShopAbilitiesHeal,
      ShopAbilitiesMagic,
      ShopAbilitiesSpecial,
    );
    return of(shopAbilitiesPages);
  }
  selectHero(hero: Hero) {
    this.choosenHero = hero;
  }
  selectItem(itemType: ItemType, item: { value: number, cost: number}) {
    if (this.choosenItem && this.choosenItem.itemType == itemType
      && this.choosenItem.item.value == item.value) {
        this.choosenItem = null;
        this.isSelectedAvailableSource.next(false);
    }
    else if (this.playerService.gold >= item.cost){
      this.choosenHitpoints = null;
      this.choosenItem = {itemType: itemType, item: item };
      this.checkSelectedAvailable();
    }
  }
  selectHitpoints(item: { value: number, cost: number}) {
    if (this.choosenHitpoints && this.choosenHitpoints.value == item.value) {
        this.choosenHitpoints = null;
        this.isSelectedAvailableSource.next(false);
    }
    else if (this.playerService.gold >= item.cost){
      this.choosenItem = null;
      this.choosenHitpoints = item;
      this.checkSelectedAvailable();
    }
  }
  selectAbility(ability: Ability) {
    const previousAbility = this.choosenAbilities.filter(p => p.pageType === this.choosenPageType);
    if (previousAbility.length) {
      previousAbility[0].ability = ability;
    } else {
      this.choosenAbilities.push({
        pageType: this.choosenPageType,
        ability,
      });
    }
    this.checkSelectedAvailable();
  }
  selectPage(pageType: ShopPageType) {
    this.choosenPageType = pageType;
    this.checkSelectedAvailable();
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
  buyAbility() {
    const ability = this.choosenAbility;
    if (ability != null) {
      let currentHero = this.heroService.heroes.find(p => p.id === this.choosenHero.id);
      if (currentHero.abilities.every(a => a !== ability.type)) {
        this.playerService.decreaseGold(ability.cost).then(success => {
          if (success) {
            currentHero.abilities.push(ability.type);
          }
          this.resetCurrentAbility();
        });
      }
    }
    this.isSelectedAvailableSource.next(false);
  }

  buyEquipment() {
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
    this.isSelectedAvailableSource.next(false);
  }

  private buyHitpoint(hero: Hero): Promise<boolean>{
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
  private buyItem(hero: Hero){
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
  private checkSelectedAvailable() {
    let selected: { cost: number };
    switch(this.choosenPageType) {
      case ShopPageType.Items:
      selected = this.choosenItem ? this.choosenItem.item : this.choosenHitpoints;
      break;
      default:
      selected = this.choosenAbility;
      break;
    }
    const isSelectedAvailable = !!selected && !!selected.cost && selected.cost < this.playerService.gold;
    this.isSelectedAvailableSource.next(isSelectedAvailable);
  }
  private resetCurrentAbility() {
    const abilityIndex = this.choosenAbilities.findIndex(p => p.pageType === this.choosenPageType);
    this.choosenAbilities.splice(abilityIndex, 1);
  }
}
