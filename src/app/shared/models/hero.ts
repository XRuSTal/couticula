import { AbilityType, HeroClass } from '@enums';
import { Creature } from './creature';

export class Hero extends Creature {
  id: number;
  heroClass: HeroClass;
  addonHitPoint: number;
  maxAddonHitPoint: number;
  maxItemValue: number;
  lastTargetInBattle: number;
  uniqueAbilities: AbilityType[]; // уникальные способности героя
  shopHideAbilities: AbilityType[];

  constructor(
    name: string,
    img: string,
    hitpoint = 0,
    weapon = 0,
    head = 0,
    hands = 0,
    legs = 0,
    body = 0
  ) {
    super(name, img, hitpoint, weapon, head, hands, legs, body);
    this.addonHitPoint = 0;
  }

  static getHeroClassName(heroClass: HeroClass) {
    switch (heroClass) {
      case HeroClass.Prist:
        return 'Клирик';
      case HeroClass.Scout:
        return 'Следопыт';
      case HeroClass.Warrior:
        return 'Воин';
    }
  }

  setAddonHitPoints(value: number) {
    this.hitPoint += value - this.addonHitPoint;
    this.addonHitPoint = value;
  }
}
