import { AbilityType } from '@app/shared/enums';
import { AbilitySettings } from '@app/shared/models';

export const ShopAbilitiesDefence: AbilitySettings[] = [
  {
    type: AbilityType.HeroCastDecreaseRegeneration1,
    name: 'Ослабление регенерации.',
    description: 'Снижение регенерации на 1 до конца боя',
    image: 'assets/img/abilities/decrease-regeneration-1.jpg',
    cost: 2000,
    maxUseCount: 1,
    isImmediateAction: false,
    isAddonAction: false,
    countTarget: 1,
  },
];
