import { HeroClass } from '@enums';

export const HeroTypes = [
  {
    heroClass: HeroClass.Warrior,
    name: 'Воин',
    img: 'assets/img/heroes/warrior.jpg',
    hitPoint: 50,
    maxAddonHitPoint: 70,
    maxArmorValue: 6,
    maxWeaponValue: 6,
    description: '+1 к силовому вскрытию сундуков.',
  },
  {
    heroClass: HeroClass.Prist,
    name: 'Клирик',
    img: 'assets/img/heroes/prist.jpg',
    hitPoint: 50,
    maxAddonHitPoint: 70,
    maxArmorValue: 6,
    maxWeaponValue: 6,
    description: 'вместо атаки лечение.',
  },
  {
    heroClass: HeroClass.Scout,
    name: 'Следопыт',
    img: 'assets/img/heroes/scout.jpg',
    hitPoint: 30,
    maxAddonHitPoint: 20,
    maxArmorValue: 3,
    maxWeaponValue: 3,
    description:
      '+1 к вскрытию сундуков, максимальная броня/оружие 3, максимум 50 хитов, ударяет цель дважды.',
  },
];
