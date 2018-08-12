import { AbilityType } from '@app/shared/enums';
import { Ability } from '@app/shared/models';

export const ShopAbilitiesSpecial: Ability[] = [
  {
    type: AbilityType.HeroCastDecreaseRegeneration1,
    name: 'Ослабление регенерации.',
    description: 'Снижение регенерации на 1 до конца боя',
    img: 'assets/img/abilities/decrease-regeneration-1.jpg',
    cost: 5000,
    maxUseCount: 1,
    isImmediateAction: false,
    isAddonAction: false,
    countTarget: 1,
  },
];
