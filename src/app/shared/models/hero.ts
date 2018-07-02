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

  constructor(name: string, img: string, hitpoint: number = 0, weapon: number = 0, head: number = 0, hands: number = 0, legs: number = 0, body: number = 0) {
    super(name, img, hitpoint, weapon, head, hands, legs, body);
    this.addonHitPoint = 0;
  }

  setAddonHitPoints(value: number) {
    this.hitPoint += value - this.addonHitPoint;
    this.addonHitPoint = value;
  }
}
