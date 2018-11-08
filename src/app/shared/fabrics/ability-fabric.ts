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
  return basicAttack(currentCreature, targetCreature, {});
}

function heroBasicHeal(currentCreature: Creature, targetCreature: Creature) {
  return basicHeal(currentCreature, targetCreature, { useWeapon: true, fixedHeal: null, diceHeal: null });
}

function monsterBasicAttack(currentCreature: Creature, targetCreature: Creature) {
  return basicAttack(currentCreature, targetCreature, {});
}

function basicAttack(currentCreature: Creature, targetCreature: Creature, options): AbilityResult {
  return null;
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
  const healValueMax = options.fixedHeal ? options.fixedHeal : (weaponHeal + diceHeal) * healCoefficient;
  const healValue = increaseHitpoint(currentCreature, healValueMax);

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

function decreaseHitpoint(creature: Creature, damageValue: number) {
  let damage = 0;
  if (!creature.isExistsEffect(EffectType.BlockDamage)) {
    if (
      creature.hitPoint <= damageValue ||
      damageValue >= 13 && creature.isExistsEffect(EffectType.Destructible13)
    ) {
      damage = this.hitPoint;
      creature.hitPoint = 0;
      creature.state = CreatureState.DeadInThisTurn;
    } else {
      damage = damageValue;
      creature.hitPoint -= damageValue;
    }
  }
  return damage;
}

function increaseHitpoint(creature: Creature, healValue: number): number {
  let addonHitPoint = 0;

  if (!creature.isExistsEffect(EffectType.BlockHeal)) {
    addonHitPoint = creature.hitPoint + healValue > creature.maxHitPoint
      ? creature.maxHitPoint - creature.hitPoint
      : healValue;
    creature.hitPoint = creature.hitPoint + addonHitPoint;
  }
  return addonHitPoint;
}
