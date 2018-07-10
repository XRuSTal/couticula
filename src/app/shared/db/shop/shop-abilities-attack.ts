import { AbilityType } from "@app/shared/enums";

export const ShopAbilitiesAttack = [
  {
    "type": AbilityType.HeroCastDecreaseRegeneration1,
    "name": "Ослабление регенерации.",
    "description": "Снижение регенерации на 1 до конца боя",
    "img": "assets/img/abilities/decrease-regeneration-1.jpg",
    "cost": 300,
    "maxUseCount": 1,
    "isImmediateAction": false,
    "isAddonAction": false,
    "countTarget": 1
  },
  {
    "type": AbilityType.HeroCastSlackness,
    "name": "Вялость",
    "description": "На следующий ход урон цели снижается на 2",
    "img": "assets/img/abilities/sadness.jpg",
    "cost": 200,
    "maxUseCount": 1,
    "isImmediateAction": false,
    "isAddonAction": true,
    "countTarget": 1
  },
  {
    "type": AbilityType.HeroHealWithAllies,
    "name": "Совместное лечение",
    "description": "При лечении союзников лечит себе 4 жизни",
    "img": "assets/img/abilities/heal-with-allies.jpg",
    "cost": 400,
    "maxUseCount": 1,
    "isImmediateAction": true,
    "isAddonAction": true,
    "countTarget": 1
  },
  {
    "type": AbilityType.HeroCastDecreaseRegeneration1,
    "name": "Ослабление регенерации.",
    "description": "Снижение регенерации на 1 до конца боя",
    "img": "assets/img/abilities/decrease-regeneration-1.jpg",
    "cost": 300,
    "maxUseCount": 1,
    "isImmediateAction": false,
    "isAddonAction": false,
    "countTarget": 1
  },
  {
    "type": AbilityType.HeroCastSlackness,
    "name": "Вялость",
    "description": "На следующий ход урон цели снижается на 2",
    "img": "assets/img/abilities/sadness.jpg",
    "cost": 200,
    "maxUseCount": 1,
    "isImmediateAction": false,
    "isAddonAction": false,
    "countTarget": 1
  },
  {
    "type": AbilityType.HeroHealWithAllies,
    "name": "Совместное лечение",
    "description": "При лечении союзников лечит себе 4 жизни",
    "img": "assets/img/abilities/heal-with-allies.jpg",
    "cost": 400,
    "maxUseCount": 1,
    "isImmediateAction": true,
    "isAddonAction": false,
    "countTarget": 1
  }
]
