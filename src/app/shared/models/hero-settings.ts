import { HeroClass } from '@enums';

export interface HeroSettings {
  description: string;
  heroClass: HeroClass;
  hitPoint: number;
  img: string;
  maxAddonHitPoint: number;
  maxArmorValue: number;
  maxWeaponValue: number;
  name: string;
}
