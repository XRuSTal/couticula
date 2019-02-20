import { AbilityType, HeroClass } from '@enums';
import { Creature } from './creature';

export class Hero extends Creature {
  heroClass: HeroClass;
  addonHitPoint: number;
  maxAddonHitPoint: number;
  maxItemValue: number;
  uniqueAbilities: AbilityType[]; // уникальные способности героя
  shopHideAbilities: AbilityType[];

  constructor(
    id: number,
    name: string,
    image: string,
    hitpoint = 0,
    weapon = 0,
    head = 0,
    hands = 0,
    legs = 0,
    body = 0
  ) {
    super(id, name, image, hitpoint, weapon, head, hands, legs, body);
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
    this.maxHitPoint += value - this.addonHitPoint;
    this.addonHitPoint = value;
  }
}
