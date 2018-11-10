import { AbilityType } from '@app/shared/enums';
import { AbilitySettings } from '@app/shared/models';

export const ShopAbilitiesDefence: AbilitySettings[] = [
  {
    type: AbilityType.HeroAcceptAggression,
    name: 'Вызов',
    description: 'Принять агрессию монстров на себя, монстры перенацеливается на данного героя (1 раз за бой)',
    image: 'assets/img/abilities/accept-agression.jpg',
    cost: 100,
    maxUseCount: 1,
    isImmediateAction: false,
    isAddonAction: false,
    countTarget: null,
  },
  {
    type: AbilityType.HeroAttackOffset,
    name: 'Смещение атаки',
    description: 'При получении удара в голову, атака переходит в другую часть тела (1 раз за бой)',
    image: 'assets/img/abilities/attack-offset.jpg',
    cost: 100,
    maxUseCount: null,
    isImmediateAction: true,
    isPassiveAction: true,
    isAddonAction: false,
    countTarget: null,
  },
  {
    type: AbilityType.HeroRemoveAggression,
    name: 'Укрытие',
    description: 'Снятие агрессии, монстры перенацеливается на другого героя (1 раз за бой)',
    image: 'assets/img/abilities/remove-aggression.jpg',
    cost: 100,
    maxUseCount: 1,
    isImmediateAction: false,
    isAddonAction: false,
    countTarget: null,
  },
  {
    type: AbilityType.HeroResistPoisonWeak,
    name: 'Слабая защита от яда',
    description: 'Иммунитет к яду с уроном 1',
    image: 'assets/img/abilities/resist-poison-weak.jpg',
    cost: 100,
    maxUseCount: null,
    isImmediateAction: true,
    isPassiveAction: true,
    isAddonAction: false,
    countTarget: null,
  },
  {
    type: AbilityType.HeroShieldWeak,
    name: 'Разбитый щит',
    description: 'Щит, броня 2, на 2 удара',
    image: 'assets/img/abilities/shield-weak.jpg',
    cost: 100,
    maxUseCount: null,
    isImmediateAction: true,
    isAddonAction: false,
    countTarget: null,
  },
  {
    type: AbilityType.HeroShieldMedium,
    name: 'Стойкий щит',
    description: 'Щит, броня 3, на 4 удара',
    image: 'assets/img/abilities/shield-medium.jpg',
    cost: 300,
    maxUseCount: null,
    isImmediateAction: true,
    isAddonAction: false,
    countTarget: null,
  },
  {
    type: AbilityType.HeroShieldStrong,
    name: 'Прочный щит',
    description: 'Щит, броня 2, на 6 ударов',
    image: 'assets/img/abilities/shield-strong.jpg',
    cost: 400,
    maxUseCount: null,
    isImmediateAction: true,
    isAddonAction: false,
    countTarget: null,
  },
];
