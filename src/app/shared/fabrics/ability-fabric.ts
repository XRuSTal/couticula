import {
  HeroBasicAbilities,
  MonsterAbilities,
  ShopAbilitiesAttack,
  ShopAbilitiesDefence,
  ShopAbilitiesHeal,
  ShopAbilitiesMagic,
  ShopAbilitiesSpecial,
} from '@shared/db';
import { Ability, AbilityResult, AbilitySettings, Creature } from '@models';
import { AbilityType, CreatureState, DiceTarget, EffectType } from '@enums';
import { Random } from '@services';
import { EffectsFabric } from './effects-fabric';

// максимально возможная броня равна 6
const ARMOR_MAX = 6;

export class AbilityFabric {
  private static abilities = new Map<
    AbilityType,
    (currentCreature: Creature, targetCreature: Creature) => AbilityResult
  >();
  private static abilitiesSettings = new Map<AbilityType, AbilitySettings>();

  static createAbility(abilityType: AbilityType): Ability {
    const settings = AbilityFabric.abilitiesSettings.get(abilityType);

    return AbilityFabric.createAbilityBySettings(settings);
  }

  static createAbilityBySettings(settings: AbilitySettings): Ability {
    const func = AbilityFabric.abilities.get(settings.type);

    if (func) {
      return new Ability(settings, func);
    } else {
      return new Ability(settings, () => {
        console.log('TODO: ability', AbilityType[settings.type]);
        return null;
      });
    }
  }

  static initialize() {
    AbilityFabric.prepareAbilitiesSettings();
    AbilityFabric.prepareAbilities();
  }

  private static prepareAbilitiesSettings() {
    const allSettings = [
      ...HeroBasicAbilities,
      ...MonsterAbilities,
      ...ShopAbilitiesAttack,
      ...ShopAbilitiesDefence,
      ...ShopAbilitiesHeal,
      ...ShopAbilitiesMagic,
      ...ShopAbilitiesSpecial
    ];
    allSettings.forEach(settings => {
      AbilityFabric.abilitiesSettings.set(settings.type, settings);
    });
  }

  private static prepareAbilities() {
    AbilityFabric.abilities.set(AbilityType.HeroBasicAttack, heroBasicAttack);
    AbilityFabric.abilities.set(AbilityType.HeroPoisonWeak, heroPoisonWeak);
    AbilityFabric.abilities.set(AbilityType.HeroPoisonMedium, heroPoisonMedium);
    AbilityFabric.abilities.set(AbilityType.HeroPoisonStrong, heroPoisonStrong);
    AbilityFabric.abilities.set(AbilityType.HeroRage, heroRage);
    AbilityFabric.abilities.set(AbilityType.HeroStanWeak, heroStanWeak);
    AbilityFabric.abilities.set(AbilityType.HeroStanMedium, heroStanMedium);
    AbilityFabric.abilities.set(AbilityType.HeroStanStrong, heroStanStrong);
    AbilityFabric.abilities.set(AbilityType.HeroThrowSpearow, heroThrowSpearow);

    AbilityFabric.abilities.set(AbilityType.HeroBasicHeal, heroBasicHeal);
    AbilityFabric.abilities.set(AbilityType.HeroHealAfterBattle, heroHealAfterBattle);

    AbilityFabric.abilities.set(AbilityType.MonsterBasicAttack, monsterBasicAttack);
  }
}
AbilityFabric.initialize();

// *****************************************************************************
// ABILITIES FUNCTIONS
// *****************************************************************************

// Attack:

function heroBasicAttack(currentCreature: Creature, targetCreature: Creature) {
  return basicAttack(currentCreature, targetCreature, {
    useWeapon: true, magicAttack: false,
    fixedDamage: null, weaponDamage: null, damageCoefficient: 1,
    diceDamage: null, diceTarget: null,
  });
}

function heroPoisonWeak(currentCreature: Creature, targetCreature: Creature) {
  const newEffect = EffectsFabric.createEffect(EffectType.AttackWithPoisonWeak2);
  currentCreature.effects.push(newEffect);
  return null;
}
function heroPoisonMedium(currentCreature: Creature, targetCreature: Creature) {
  const newEffect = EffectsFabric.createEffect(EffectType.AttackWithPoisonMedium2);
  currentCreature.effects.push(newEffect);
  return null;
}
function heroPoisonStrong(currentCreature: Creature, targetCreature: Creature) {
  const newEffect = EffectsFabric.createEffect(EffectType.AttackWithPoisonStrong3);
  currentCreature.effects.push(newEffect);
  return null;
}

function heroRage(currentCreature: Creature, targetCreature: Creature) {
  const newEffect = EffectsFabric.createEffect(EffectType.Rage);
  currentCreature.effects.push(newEffect);
  return null;
}

function heroStanWeak(currentCreature: Creature, targetCreature: Creature) {
  const newEffect = EffectsFabric.createEffect(EffectType.AttackWithStanWeak);
  currentCreature.effects.push(newEffect);
  return null;
}
function heroStanMedium(currentCreature: Creature, targetCreature: Creature) {
  const newEffect = EffectsFabric.createEffect(EffectType.AttackWithStanMedium);
  currentCreature.effects.push(newEffect);
  return null;
}
function heroStanStrong(currentCreature: Creature, targetCreature: Creature) {
  const newEffect = EffectsFabric.createEffect(EffectType.AttackWithStanStrong);
  currentCreature.effects.push(newEffect);
  return null;
}

function heroThrowSpearow(currentCreature: Creature, targetCreature: Creature) {
  return basicAttack(currentCreature, targetCreature, {
    useWeapon: true, magicAttack: false,
    fixedDamage: null, weaponDamage: 1, damageCoefficient: 1,
    diceDamage: null, diceTarget: null,
  });
}

// Defense:

// Heal:

function heroBasicHeal(currentCreature: Creature, targetCreature: Creature) {
  return basicHeal(
    currentCreature, targetCreature,
    { useWeapon: true, fixedHeal: null, weaponHeal: null, diceHeal: null }
  );
}

function heroHealAfterBattle(currentCreature: Creature, targetCreature: Creature) {
  return basicHeal(
    currentCreature, currentCreature,
    { useWeapon: false, fixedHeal: 7, weaponHeal: null, diceHeal: null }
  );
}

// Magic:

// Special:

// Monsters:

function monsterBasicAttack(currentCreature: Creature, targetCreature: Creature) {
  return basicAttack(currentCreature, targetCreature, {
    useWeapon: true, magicAttack: false,
    fixedDamage: null, weaponDamage: null, damageCoefficient: 1,
    diceDamage: null, diceTarget: null,
  });
}

/** HELPERS FUNCTIONS */

function basicAttack(currentCreature: Creature, targetCreature: Creature, options: {
  useWeapon: boolean;
  magicAttack: boolean;
  fixedDamage: number;
  weaponDamage: number;
  damageCoefficient: number;
  diceDamage: number;
  diceTarget: DiceTarget;
}): AbilityResult {
  const targetCreatureBefore = targetCreature/*.copy()*/;
  const targetCreatureAfter = targetCreature;

  let diceTarget = throwDiceTarget(currentCreature, targetCreature, options.diceTarget);
  if (diceTarget === DiceTarget.Head && targetCreature.isExistsEffect(EffectType.AttackOffset)) {
    while (diceTarget === DiceTarget.Head) {
      diceTarget = throwDiceTarget(currentCreature, targetCreature);
    }
    targetCreature.dropCurrentEffect(EffectType.AttackOffset);
  }
  // проверка на фиксированный бросок и замену оружия
  const diceDamage = options.diceDamage || throwDiceDamage(currentCreature);
  const weaponDamage = calcWeaponValue(currentCreature, options);
  let damageValue = options.fixedDamage || (diceDamage + weaponDamage);

  // TODO: действия при атаке
  // currentCreature.currentEffects.forEach(effect => effect.effectCausedByAttack(targetCreature));
  if (diceTarget === DiceTarget.Legs) {
    // TODO: особое оглушение для монстра
    currentCreature.currentEffects.some(effect => {
      if (effect.effectType === EffectType.SpecialAttackLegs) {
        // effect.action(targetCreature);
        return true;
      }
    });
  }

  if (!options.magicAttack) {
    const armor = calcTargetCreatureArmor(currentCreature, targetCreature, diceTarget);
    damageValue -= armor;
  }

  const damageCoefficient = calcDamageCoefficient(currentCreature, targetCreature, diceDamage, diceTarget, options);
  damageValue *= damageCoefficient;

  if (currentCreature.isExistsEffect(EffectType.Slackness)) {
    damageValue -= 2;
  }

  damageValue = (damageValue < 0) ? 0 : decreaseHitPoints(targetCreature, damageValue);
  decreaseShield(currentCreature);

  // Состояние броска
  currentCreature.lastDiceTarget = options.magicAttack ? null : diceTarget;
  currentCreature.lastDiceValue = options.fixedDamage ? null : diceDamage;

  const abilityResult: AbilityResult = {
    targetCreatureBefore,
    targetCreatureAfter,
    diceTarget: currentCreature.lastDiceTarget,
    diceValue: currentCreature.lastDiceValue,
    value: damageValue,
  };
  return abilityResult;
}

function basicHeal(currentCreature: Creature, targetCreature: Creature, options: {
  useWeapon: boolean;
  fixedHeal: number;
  weaponHeal: number;
  diceHeal: number;
}): AbilityResult {
  const targetCreatureBefore = targetCreature/*.copy()*/;
  const targetCreatureAfter = targetCreature;

  const diceHeal = options.diceHeal || throwDiceDamage(currentCreature);
  const weaponHeal = calcWeaponValue(currentCreature, options);
  const healCoefficient = calcHealCoefficient(currentCreature, diceHeal);
  const healValueMax = options.fixedHeal || (weaponHeal + diceHeal) * healCoefficient;
  const healValue = increaseHitPoints(currentCreature, healValueMax);

  // Состояние броска
  currentCreature.lastDiceTarget = null;
  currentCreature.lastDiceValue = options.fixedHeal ? null : diceHeal;

  // TODO: Совместное лечение
  if (currentCreature !== targetCreature) {
    currentCreature.currentEffects.forEach(effect => {
      if (effect.effectType === EffectType.HealWithAllies) {
        // effect.action(currentCreature);
      }
    });
  }

  // TODO: Возвращать Array<AbilityResult>, для информации по нескольким существам
  const abilityResult: AbilityResult = {
    targetCreatureBefore,
    targetCreatureAfter,
    diceTarget: currentCreature.lastDiceTarget,
    diceValue: currentCreature.lastDiceValue,
    value: healValue,
  };
  return abilityResult;
}

function throwDiceDamage(creature: Creature): number {
  if (creature.isExistsEffect(EffectType.Course)) {
    return 1;
  }
  const dice: number = Random.throwDiceD6();
  return dice;
}

function throwDiceTarget(currentCreature: Creature, targetCreature: Creature, dice?: DiceTarget): DiceTarget {
  if (
    currentCreature.isExistsEffect(EffectType.TargetAttackLegs) &&
    !targetCreature.isExistsEffect(EffectType.CreatureWithoutLegs)
  ) {
    return DiceTarget.Legs;
  }
  if (!dice) {
    dice = Random.throwDiceD6();
  }
  switch (dice) {
    case 1:
      if (targetCreature.isExistsEffect(EffectType.CreatureWithoutHead)) {
        return throwDiceTarget(currentCreature, targetCreature);
      } else {
        return DiceTarget.Head;
      }
    case 2:
      if (targetCreature.isExistsEffect(EffectType.CreatureWithoutHands)) {
        return throwDiceTarget(currentCreature, targetCreature);
      } else {
        return DiceTarget.Hands;
      }
    case 3:
      if (targetCreature.isExistsEffect(EffectType.CreatureWithoutLegs)) {
        return throwDiceTarget(currentCreature, targetCreature);
      } else {
        return DiceTarget.Legs;
      }
    default:
      if (targetCreature.isExistsEffect(EffectType.CreatureWithoutBody)) {
        return throwDiceTarget(currentCreature, targetCreature);
      } else {
        return DiceTarget.Body;
      }
  }
}

function calcTargetCreatureArmor(currentCreature: Creature, targetCreature: Creature, diceTarget: DiceTarget) {
  // проверка игнорирования брони атакующим
  if (currentCreature.isExistsEffect(EffectType.AttackWithIgnoringArmor)) {
    return 0;
  }
  // проверка на игнорирование и наличие щита
  let armor = !targetCreature.equipment.Shield || currentCreature.isExistsEffect(EffectType.AttackWithIgnoringShield)
    ? 0
    : targetCreature.equipment.Shield.value;

  // определение брони части тела цели
  switch (diceTarget) {
    case DiceTarget.Head:
      if (targetCreature.equipment.Head) {
        armor += targetCreature.equipment.Head.value;
      }
      break;
    case DiceTarget.Hands:
      if (targetCreature.equipment.Hands) {
        armor += targetCreature.equipment.Hands.value;
      }
      break;
    case DiceTarget.Legs:
      if (targetCreature.equipment.Legs && !currentCreature.isExistsEffect(EffectType.SpecialAttackLegs)) {
        armor += targetCreature.equipment.Legs.value;
      }
      break;
    case DiceTarget.Body:
      if (targetCreature.equipment.Body) {
        armor += targetCreature.equipment.Body.value;
      }
      break;
  }
  return (armor > ARMOR_MAX) ? ARMOR_MAX : armor;
}

function calcDamageCoefficient(
  currentCreature: Creature,
  targetCreature: Creature,
  diceDamage: number,
  diceTarget: DiceTarget,
  options: {
    damageCoefficient: number,
    magicAttack: boolean,
  }
) {
  let damageCoefficient = options && options.damageCoefficient || 1;

  if (options && options.magicAttack) {
    if (targetCreature.isExistsEffect(EffectType.MagicProtection)) {
      damageCoefficient = 0;
    }
  } else {
    if (diceTarget === DiceTarget.Head) {
      damageCoefficient *= 2;
    }
    if (diceDamage === 6 && currentCreature.isExistsEffect(EffectType.Rage)) {
      damageCoefficient *= 2;
    }
    if (targetCreature.isExistsSomeEffects([EffectType.Stan2, EffectType.Stan]) &&
      targetCreature.isExistsEffect(EffectType.ResistStanSpecial)
    ) {
      // особое сопротивление оглушению для монстра
      targetCreature.dropCurrentEffects([EffectType.Stan2, EffectType.Stan]);
      damageCoefficient *= 2;
    }
  }

  if (targetCreature.isExistsEffect(EffectType.Suppression)) {
    damageCoefficient *= 2;
  }

  return damageCoefficient;
}

function calcHealCoefficient(creature: Creature, dice: number) {
  if (
    creature.isExistsEffect(EffectType.WounderHeal) &&
    (dice === 5 || dice === 6)
  ) {
    return 2;
  } else {
    return 1;
  }
}

function calcWeaponValue(
  currentCreature: Creature,
  options: {
    useWeapon: boolean;
    weaponDamage?: number;
    weaponHeal?: number;
  }
) {
  if (options && options.useWeapon) {
    if (options.weaponDamage) {
      return options.weaponDamage;
    } else if (options.weaponHeal) {
      return options.weaponHeal;
    } else {
      return currentCreature.equipment.Weapon ? currentCreature.equipment.Weapon.value : 0;
    }
  } else {
    return 0;
  }
}
function decreaseHitPoints(creature: Creature, damageValue: number) {
  let damage = 0;
  if (!creature.isExistsEffect(EffectType.BlockDamage)) {
    if (
      creature.hitPoint <= damageValue ||
      damageValue >= 13 && creature.isExistsEffect(EffectType.Destructible13)
    ) {
      damage = creature.hitPoint;
      creature.hitPoint = 0;
      creature.state = CreatureState.DeadInThisTurn;
    } else {
      damage = damageValue;
      creature.hitPoint -= damageValue;
    }
  }
  return damage;
}

function increaseHitPoints(creature: Creature, healValue: number): number {
  let addonHitPoint = 0;

  if (!creature.isExistsEffect(EffectType.BlockHeal)) {
    addonHitPoint = creature.hitPoint + healValue > creature.maxHitPoint
      ? creature.maxHitPoint - creature.hitPoint
      : healValue;
    creature.hitPoint = creature.hitPoint + addonHitPoint;
  }
  return addonHitPoint;
}

function decreaseShield(creature: Creature) {
  if (creature.equipment.Shield && creature.equipment.Shield.currentHitPoint > 0) {
    creature.equipment.Shield.currentHitPoint -= 1; // даже при игнорировании щита он ломается
    if (creature.equipment.Shield.currentHitPoint === 0) {
      // поломка щита
      creature.dropCurrentEffect(EffectType.Shield);
    }
  }
}
