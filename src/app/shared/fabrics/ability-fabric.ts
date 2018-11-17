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
  // проверка на игнорирование и наличие щита
  const armor = !targetCreature.equipment.Shield || currentCreature.isExistsEffect(EffectType.AttackWithIgnoringShield)
    ? 0
    : targetCreature.equipment.Shield.value;

  damageValue *= options.damageCoefficient;

  if (damageValue < 0) {
    damageValue = 0;
  }
  damageValue = decreaseHitPoints(targetCreature, damageValue);
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
