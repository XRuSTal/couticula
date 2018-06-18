import { ItemType,
  IHero, IHeroSettings,
  AbilityType, HeroClass
} from '../interface';
import { Creature, Item } from './index';


export class Hero extends Creature /*implements IHero */{
  static GUID: number = 0;
  constructor(name: string, img: string, hitpoint: number = 0, weapon: number = 0, head: number = 0, hands: number = 0, legs: number = 0, body: number = 0) {
    super(name, img, hitpoint, weapon, head, hands, legs, body);
    this.id = Hero.GUID++;
    this.addonHitPoint = 0;
  }
  static createHero(hero: IHeroSettings): Hero {
    let newHero = new Hero(hero.name, hero.img, hero.hitPoint);
    newHero.description = hero.description;
    newHero.heroClass = hero.heroClass;
    newHero.maxAddonHitPoint = hero.maxAddonHitPoint;
    newHero.maxItemValue = hero.maxArmorValue;
    //newHero.inventory = hero.inventory;
    //newHero.uniqueAbilities = hero.uniqueAbilities;
    //newHero.shopHideAbilities = hero.shopHideAbilities;
    return newHero;
  }
  public id: number;
  public heroClass: HeroClass;
  public addonHitPoint: number;
  public maxAddonHitPoint: number;
  public maxItemValue: number;
  public lastTargetInBattle: number;
  public uniqueAbilities: AbilityType[];          // уникальные способности героя
  public shopHideAbilities: AbilityType[];

  public setAddonHitPoints(value: number) {
    this.hitPoint += value - this.addonHitPoint;
    this.addonHitPoint = value;
  }
}