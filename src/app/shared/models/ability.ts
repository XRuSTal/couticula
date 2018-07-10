import { AbilityType } from '@enums';

// TODO: перенести в магазин (shop.ts)
var AbilitiesShop = {
  Attack: [
    //AbilityType.HeroSimpleAttack, // Базовая способность всех существ
    AbilityType.HeroPoisonWeak,     // Яд шанс 1/6, урон 2
    AbilityType.HeroPoisonMedium,   // Яд шанс 1/3, урон 2
    AbilityType.HeroPoisonStrong,   // Яд шанс 1/2, урон 3
    AbilityType.HeroRage,           // При выпадании 6 во время атаки - удвоение урона.
    AbilityType.HeroStanWeak,       // Оглушение цели шанс 1/6 (пропускает ход)
    AbilityType.HeroStanMedium,     // Оглушение цели шанс 1/3 (пропускает ход)
    AbilityType.HeroStanStrong,     // Оглушение цели шанс 1/2 (пропускает ход)
    AbilityType.HeroThrowSpearow,   // Метание сулицы (2 раза за бой)
  ],
  Defense: [
    AbilityType.HeroAcceptAggression,   // Принять агрессию на себя
    AbilityType.HeroAttackOffset,       // Смещение атаки
    AbilityType.HeroRemoveAggression,   // Снятие агрессии с себя
    AbilityType.HeroResistPoisonWeak,   // Иммунитет к яду с уроном 1
    AbilityType.HeroShieldWeak,         // Щит, броня 2, на 2 удара
    AbilityType.HeroShieldMedium,       // Щит, броня 3, на 4 удара
    AbilityType.HeroShieldStrong,       // Щит, броня 2, на 6 ударов
  ],
  Heal: [
    AbilityType.HeroHealAfterBattle,// Лечение на 7хитов(вне боя)
    AbilityType.HeroHealFromPoisonAfterBattle, // Лечение от яда
    AbilityType.HeroHealWithAllies, // При лечении союзников лечит себе 4 жизни
    AbilityType.HeroHealWeak,       // Лечение на 5хитов
    AbilityType.HeroHealMedium,     // Лечение на 15хитов(1 раз за бой)
    AbilityType.HeroHealStrong,     // Лечение на 20хитов(2 раза за бой)
  ],
  Magic: [
    AbilityType.HeroCastDecreaseRegeneration1,  // "Ослабление регенерации"
    AbilityType.HeroCastFlash,                  // Вспышка
    AbilityType.HeroCastFireBall,               // Огненный шар
    AbilityType.HeroCastImbecility,             // Скудоумие
    AbilityType.HeroCastLightningStrikes,       // Удары молний
    AbilityType.HeroCastMagicAttackStanned,     // Леденящий поток
    AbilityType.HeroCastMagicProtection,        // Магический щит
    AbilityType.HeroCastSlackness,              // Вялость
    AbilityType.HeroCastSuppression,            // Подавление
    AbilityType.HeroCastTripleMagicAttack,      // Кара стихий
    AbilityType.HeroCastTripleStan,             // Оглушение троих
    AbilityType.HeroCastTurningToStone,         // Окаменение
  ],
  Special: [
    AbilityType.AddSecondHero,      // Найм второго героя
    AbilityType.AddThirdHero,       // Найм третьего героя
  ],
}

export class Ability {
  type: AbilityType;
  name: string;
  description: string;
  //ability: Helpers.Func<void, AbilityResult>;
  //image: ImageType;
  img: string;
  cost: number;
  maxUseCount: number;
  isImmediateAction: boolean;
  isAddonAction: boolean;
  countTarget: number;
  //combo: AbilityType[];
  /*constructor(name: string, description: string, image: ImageType, cost: number, abilityFunction: Helpers.Func<void, AbilityResult>, options) {
    //this.isImmediateAction = immediateAction;
    this.name = name;
    this.description = description;
    this.image = image;
    this.cost = cost;
    this.ability = abilityFunction;
    this.isImmediateAction = options.isImmediateAction || false;
    this.isAddonAction = options.isAddonAction || false;
    this.maxUseCount = options.maxUseCount || null;
    this.combo = options.combo || null;
    this.countTarget = options.countTarget || 1;
  }*/
}
