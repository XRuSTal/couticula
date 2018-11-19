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
import { AbilityType, CreatureState, EffectType } from '@enums';
import { Random } from '@services';

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
    AbilityFabric.abilities.set(AbilityType.HeroBasicHeal, heroBasicHeal);
    AbilityFabric.abilities.set(AbilityType.MonsterBasicAttack, monsterBasicAttack);
  }
}
AbilityFabric.initialize();

function heroBasicAttack(currentCreature: Creature, targetCreature: Creature) {
  return basicAttack(currentCreature, targetCreature, {
    useWeapon: true, magicAttack: false,
    fixedDamage: null, weaponDamage: null, damageCoefficient: 1,
    diceDamage: null, diceTarget: null,
  });
}

function heroBasicHeal(currentCreature: Creature, targetCreature: Creature) {
  return basicHeal(currentCreature, targetCreature, { useWeapon: true, fixedHeal: null, diceHeal: null });
}

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
  diceTarget: number;
}): AbilityResult {
  const targetCreatureBefore = targetCreature/*.copy()*/;
  const targetCreatureAfter = targetCreature;

  let diceTarget = throwDiceTarget(currentCreature, targetCreature, options.diceTarget);
  if (diceTarget === 1 && targetCreature.isExistsEffect(EffectType.AttackOffset)) {
    while (diceTarget === 1) {
      diceTarget = throwDiceTarget(currentCreature, targetCreature);
    }
    targetCreature.dropCurrentEffect(EffectType.AttackOffset);
  }
  // проверка на фиксированный бросок и замену оружия
  const diceDamage = options.diceDamage || throwDiceDamage(currentCreature);
  const weaponDamage = options.useWeapon && currentCreature.equipment.Weapon
    ? currentCreature.equipment.Weapon.value
    : 0;
  let damageValue = options.fixedDamage || (diceDamage + weaponDamage);

  // TODO: действия при атаке
  // currentCreature.currentEffects.forEach(effect => effect.effectCausedByAttack(targetCreature));
  if (diceTarget === 3) {
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
  diceHeal: number;
}): AbilityResult {
  const targetCreatureBefore = targetCreature/*.copy()*/;
  const targetCreatureAfter = targetCreature;

  const diceHeal = options.diceHeal || throwDiceDamage(currentCreature);
  const weaponHeal = options.useWeapon && currentCreature.equipment.Weapon
    ? currentCreature.equipment.Weapon.value
    : 0;
  const healCoefficient = getHealCoefficient(currentCreature, diceHeal);
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

function throwDiceTarget(currentCreature: Creature, targetCreature: Creature, dice?: number): number {
  if (
    currentCreature.isExistsEffect(EffectType.TargetAttackLegs) &&
    !targetCreature.isExistsEffect(EffectType.CreatureWithoutLegs)
  ) {
    return 3;
  }
  if (!dice) {
    dice = Random.throwDiceD6();
  }
  switch (dice) {
    case 1:
      if (targetCreature.isExistsEffect(EffectType.CreatureWithoutHead)) {
        return throwDiceTarget(currentCreature, targetCreature);
      }
      break;
    case 2:
      if (targetCreature.isExistsEffect(EffectType.CreatureWithoutHands)) {
        return throwDiceTarget(currentCreature, targetCreature);
      }
      break;
    case 3:
      if (targetCreature.isExistsEffect(EffectType.CreatureWithoutLegs)) {
        return throwDiceTarget(currentCreature, targetCreature);
      }
      break;
    default:
      if (targetCreature.isExistsEffect(EffectType.CreatureWithoutBody)) {
        return throwDiceTarget(currentCreature, targetCreature);
      }
      break;
  }
  return dice;
}

function calcTargetCreatureArmor(currentCreature: Creature, targetCreature: Creature, diceTarget: number) {
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
    case 1:
      if (targetCreature.equipment.Head) {
        armor += targetCreature.equipment.Head.value;
      }
      break;
    case 2:
      if (targetCreature.equipment.Hands) {
        armor += targetCreature.equipment.Hands.value;
      }
      break;
    case 3:
      if (targetCreature.equipment.Legs && !currentCreature.isExistsEffect(EffectType.SpecialAttackLegs)) {
        armor += targetCreature.equipment.Legs.value;
      }
      break;
    default:
      if (targetCreature.equipment.Body) {
        armor += targetCreature.equipment.Body.value;
      }
      break;
  }
  // максимально возможная броня равна 6
  return (armor > 6) ? 6 : armor;
}

function calcDamageCoefficient(
  currentCreature: Creature,
  targetCreature: Creature,
  diceDamage: number,
  diceTarget: number,
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
    if (diceTarget === 1) { // попадание в голову
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

function getHealCoefficient(creature: Creature, dice: number) {
  if (
    creature.isExistsEffect(EffectType.WounderHeal) &&
    (dice === 5 || dice === 6)
  ) {
    return 2;
  } else {
    return 1;
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
