import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { HeroClass, ItemType, IHero, IHeroSettings } from '@interface';
import { Hero, Item, Shield } from '@model';
import { HeroTypes } from '@shared/db';

import { HttpService }  from './http.service';
import { GameService }  from './game.service';
import { SettingsService }  from './settings.service';
//import { ShopService }  from './shop.service';

@Injectable()
export class HeroService {
  //private apiUrl: string;
  public heroes: Hero[];

  constructor(
    //private httpService: HttpService,
    private gameService: GameService,
    private settingsService: SettingsService
  ){
    this.heroes = [];
    //this.apiUrl = settingsService.apiUrl;
    //this.getHeroes().then(heroes => this.heroes = heroes.map(hero => new Hero(hero)));
    // обновлен список героев
    /*this.shopService.newHero.subscribe(() => {
      this.httpService.get('playerHeroes')
      .then(heroes => {
        this.heroes = heroes.map(hero => Hero.createHero(hero));
      });
    });*/
  }
  addNewHero(heroClassID: HeroClass): Promise<any> {
    return new Promise(resolve => {
      this.createHero(heroClassID)
      .then(res => {
        resolve();
      });
    });
  }
  private createHero(heroClass: HeroClass): Promise<any> {
    return new Promise(resolve => {
      let heroInfo = HeroTypes.find(p => p.heroClass === heroClass);
      let newHero: Hero =  Hero.createHero(heroInfo);
      //newHero.uniqueAbilities = heroInfo.uniqueAbilities;
      this.heroes.push(newHero);
      resolve();
    });
  }
  getAllHeroClassesDescription(): Promise<IHeroSettings[]> {
    return new Promise(resolve => {
      resolve(HeroTypes as IHeroSettings[]);
    });
  }
  equipItem(heroID: number, item: Item): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let hero = this.heroes.find(p => p.id === heroID);
      if (hero.maxItemValue < item.value)
        resolve(false); // предмет не подходит
      let oldItem: Item;
      switch (item.type) {
        case ItemType.Weapon:
          oldItem = hero.equipment.Weapon;
          hero.equipment.Weapon = item;
          break;
        case ItemType.Head:
          oldItem = hero.equipment.Head;
          hero.equipment.Head = item;
          break;
        case ItemType.Hands:
          oldItem = hero.equipment.Hands;
          hero.equipment.Hands = item;
          break;
        case ItemType.Legs:
          oldItem = hero.equipment.Legs;
          hero.equipment.Legs = item;
          break;
        case ItemType.Body:
          oldItem = hero.equipment.Body;
          hero.equipment.Body = item;
          break;
        case ItemType.Shield:
          if (hero.equipment.Shield.value !== 0) {
            oldItem = hero.equipment.Shield;
            //this.dropEffect(EffectType.Shield);
          }
          hero.equipment.Shield = item as Shield;
          //this.effects.push(new Effect("Щит", "Постоянное действие. Щит, броня " + item.value + ", прочность " + (item as Shield).hitpoint, ImageType.ShieldMedium, EffectType.Shield));
          break;
      }
      if (oldItem.value !== 0) {
        this.gameService.addonInventory(oldItem);
      }
      resolve(true);
    });
  }
}
