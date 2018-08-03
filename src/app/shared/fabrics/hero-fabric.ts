import { HeroClass } from '@enums';
import { Hero, HeroSettings } from '@models';
import { HeroTypes } from '@shared/db';

export class HeroFabric {
  static GUID = 0;

  static createHero(heroClass: HeroClass): Hero {
    const hero: HeroSettings = HeroTypes.find(p => p.heroClass === heroClass);
    const newHero = new Hero(hero.name, hero.img, hero.hitPoint);
    newHero.id = HeroFabric.GUID++;
    newHero.description = hero.description;
    newHero.heroClass = hero.heroClass;
    newHero.maxAddonHitPoint = hero.maxAddonHitPoint;
    newHero.maxItemValue = hero.maxArmorValue;
    // newHero.inventory = hero.inventory;
    // newHero.uniqueAbilities = hero.uniqueAbilities;
    // newHero.shopHideAbilities = hero.shopHideAbilities;
    return newHero;
  }
}
